var User = require('../models/users');
var jwt = require('jsonwebtoken');
var config = require('../../config');


function create(req, res, next) {

    User.find({ handle: req.body.handle })
        .then(function (user) {

            if (user.length) {

                res.json({ error: "user already exists" });
            } else {

                User.create({

                    email: req.body.email,
                    handle: req.body.handle,
                    password: req.body.password
                }, function (err, result) {

                    if (!err) {

                        res.status(200).json(result);
                    }
                })

            }
        }, function (err) {

            console.log(err);
        })



}

function login(req, res, next) {

    User.findOne(
        {
            handle: req.body.handle,
            password: req.body.password
        })
        .then(function (user) {

            if (user) {
                var token = jwt.sign({ user: { id: user.id, handle: user.handle, email: user.email } }, config.secret, { expiresIn: 86400 });
                res.status(200).json({ token: token, id: user.id, handle: user.handle, email: user.email });
            } else {

                res.json({ error: "Incorrect Login details.." })
            }
        }, function (err) {

            console.log(err);
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



module.exports = { create, login, authenticate };