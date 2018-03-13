var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../../config');


function create(req, res, next) {

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

                        if (!err) {

                            res.status(200).json({ exists: false, result });
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
            password: req.body.password
        })
        .then(function (user) {

            if (user) {
                toggleOnlineStatus(user);
                var token = jwt.sign({ user: { id: user.id, handle: user.handle, email: user.email } }, config.secret, { expiresIn: 86400 });
                res.status(200).json({ success: true, token: token, id: user.id, handle: user.handle, email: user.email });
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

        jwt.verify(token, config.secret, function (err, decoded) {

            if (err) {

                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }

            User.find()
                .skip(skip)
                .limit(limit)
                .exec()
                .then((users) => res.json(users))
        })
    }
}

function signOut(req, res, next) {


    User.findOne(
        {
            handle: req.query.handle,
        }, function (err, user) {

            if (!err) {

                toggleOnlineStatus(user);
                res.json({ signOut: true, msg: "success" });
            }
        })

}

function authenticate(req, res, next) {


    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

        res.status(200).send({ auth: true, decoded });
    });

}

function validateUser(user) {

    emailPattern = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,6})?$/;

    if (!emailPattern.test(user.email)) {

        return { valid: false, msg: "Email Invalid" };

    } else if (user.password.length < 6) {

        return { valid: false, msg: "password too short" };

    } else if (user.password != user.confirmPassword) {

        return { valid: false, msg: "passwords do not match" };

    } else {

        return { valid: true, msg: "success" }
    }

}

function toggleOnlineStatus(user) {

    let query = { handle: user.handle };
    let update = { online: !user.online };

    User.update(query, update, function (err, res) {

        if (err) {

            console.log("cannot change online status" + err)
        } else {

            // console.log(res);
        }
    })

}



module.exports = { create, login, authenticate, list, signOut };