var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../../config');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var Email = require('./email');
const bcrypt = require('bcrypt');
var io;

function create(req, res, next) {
    console.log(req.body);
    let validUser = validateUser(req.body);

    if (validUser.valid) {

        User.find({ handle: req.body.handle })
            .then(function (user) {

                if (user.length) {

                    res.json({ exists: true, msg: "username already taken" });
                } else {

                    User.create({

                        email: req.body.email,
                        handle: req.body.handle,
                        password: req.body.password,
                        online: false,
                    }, function (err, result) {
                        console.log(err);
                        if (!err) {
                            Email.sendTo(req.body.email, "confirm", req.body.handle)
                                .then((response) => {

                                    res.status(200).send({ exists: false, msg: "Email has been sent to you with the link to confirm your account" });
                                })
                                .catch((err) => {

                                    console.log(err);
                                    res.json({ exists: true, msg: "email you provided seems wrong " })
                                })
                        }

                    })

                }
            }, function (err) {

                console.log(err);
            })
    } else {

        res.json({ exists: false, valid: false, msg: validUser.msg });
    }


}

function login(req, res, next) {

    User.findOne(
        {
            handle: req.body.handle,

        })
        .then(function (user) {

            if (user) {

                if (user.active) {
                    bcrypt.compare(req.body.password, user.password, function (err, result) {
                        console.log(result);
                        if (!result) {

                            res.json({ success: false, msg: "Incorrect Login details.." })
                        } else {

                            toggleOnlineStatus(user, true);
                            var token = jwt.sign({ user: { id: user.id, handle: user.handle, email: user.email } }, config.secret, { expiresIn: 86400 });
                            res.status(200).json({ success: true, token: token, id: user.id, handle: user.handle, email: user.email });
                            io.sockets.emit('hi', { user: user.handle });
                        }
                    })

                } else {

                    res.json({ success: false, msg: "account not verified" });
                }
            } else {

                res.json({ success: false, msg: "Incorrect Login details.." })
            }


        }, function (err) {

            console.log(err);
        })
}

function list(req, res, next) {
    const { limit = 50, skip = 0 } = req.query;
    var token = req.headers['x-access-token'];
    if (!token) {

        return res.status(401).send({ auth: false, message: 'No token provided.' });

    } else {

        verifyToken(token)
            .then((decoded) => {

                User.find()
                    .skip(skip)
                    .limit(limit)
                    .exec()
                    .then((users) => res.json(users))
            })
            .catch((err) => {

                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            })
    }
}

function signOut(req, res, next) {


    User.findOne(
        {
            handle: req.query.handle,
        }, function (err, user) {

            if (!err) {

                toggleOnlineStatus(user, false);
                res.json({ signOut: true, msg: "success" });
            }
        })

}

function forgotPassword(req, res, next) {

    if (!req.query) {

        res.status(400).json({ success: false, msg: "user not found" });
    } else {

        User.findOne({

            handle: req.query.user
        }, function (err, user) {
            console.log(user);
            if (err) {
                console.log(err);
            }
            if (user !== null) {
                var email = user.email;
                Email.sendTo(email, "reset", user.handle)
                    .then((response) => {

                        res.status(200).send({ success: true, msg: "Instructions to reset your password has been sent to you via mail" });
                    })
                    .catch((err) => {

                        console.log(err);
                        res.json({ success: false, msg: "User not registered with us, try signUp insted " })
                    })
            } else {

                res.json({ success: false, msg: "User not registered with us, try signUp insted " });

            }


        })


    }

}

function resetPassword(req, res, next) {

    if (!req.body) {

        res.status(400).json({ success: false, msg: "can't update password" });
    } else {

        let user = req.body.user;

        let query = { handle: user };
        console.log(user);

        User.findOne(query, function (err, doc) {

            if (err) {
                console.log(err);
                res.json({ success: false, msg: "some error occured while updating password, Please try again later" })

            } else {

                doc.password = req.body.password;
                doc.save()
                    .then((savedUser) => {

                        res.status(202).json({ success: true, msg: "password updated succesfully" });
                        console.log(savedUser);
                    })
            }


        })
    }



}

function authenticate(req, res, next) {


    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    verifyToken(token)
        .then((decoded) => {

            res.status(200).send({ auth: true, decoded });
        })
        .catch((err) => {
            res.status(500).send({ auth: false, message: 'Unauthorized Access' });

        })

}

function verifyToken(token) {

    return new Promise(function (resolve, reject) {

        jwt.verify(token, config.secret, function (err, decoded) {
            if (err)
                reject(err);

            resolve(decoded);
        });
    })

}

function search(req, res) {

    var searchText = req.query.searchText;

    User.find({ handle: { $regex: /$searchText$/ } })
        .limit(10)
        .exec(function (err, docs) {

            if (err)
                console.log(err);

            console.log(docs);

        });
}

function validateUser(user) {

    emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;

    if (!emailPattern.test(user.email)) {

        return { valid: false, msg: "Email Invalid" };

    } else if (user.handle === null) {

        return { valid: false, msg: "please provide unique username" };

    }
    else if (user.password === null) {

        return { valid: false, msg: "password empty" };

    } else if (user.password.length < 6) {

        return { valid: false, msg: "password too short" };

    } else if (user.password != user.confirmPassword) {

        return { valid: false, msg: "passwords do not match" };

    } else {

        return { valid: true, msg: "success" }
    }

}

function toggleOnlineStatus(user, status) {

    let query = { handle: user.handle };
    let update = { online: status };

    User.update(query, update, function (err, res) {

        if (err) {

            console.log("cannot change online status" + err)
        } else {

            // console.log(res);
        }
    })

}

function activateAccount(user) {

    let query = { handle: user };

    return new Promise(function (resolve, reject) {

        User.update(query, { active: true }, function (err, res) {

            if (err) {

                reject(err);
            } else {

                resolve(res);

                // console.log(res);
            }
        })

    })

}

function confirmAccount(req, res, next) {

    var token = req.query.token;

    if (!token) {

        return res.send("unauthorized access");

    }
    verifyToken(token)
        .then((decoded) => {


            activateAccount(req.query.user)
                .then((result) => {
                    console.log(decoded);
                    res.statusCode = 302;
                    res.setHeader("Location", "http://localhost:3000/");
                    res.end();

                })
                .catch((err) => {


                    return res.send("Not able to verify account please try again later.");
                })
        })
        .catch((err) => {
            console.log(err);
            return res.send("unauthorized access");

        })

}


module.exports = { one: { create, login, authenticate, list, signOut, search, forgotPassword, resetPassword, confirmAccount }, two: function (socket) { io = socket } };
