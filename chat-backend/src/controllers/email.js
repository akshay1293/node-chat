var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var Promise = require('promise');
var jwt = require('jsonwebtoken');
var config = require('../../config');



class Email {

    static sendTo(to) {

        var options = {
            auth: {
                api_user: 'daffodil_sunil',
                api_key: 'sunil786'
            }
        }

        var client = nodemailer.createTransport(sgTransport(options));
        var token = jwt.sign({ email: to }, config.secret, { expiresIn: '1h' });

        var email = {
            from: 'support@node-chat.com',
            to: to,
            subject: 'Account Confirmation',
            //text: 'Your chat account has been created succesfully',
            html: '<p>Hi,<br><br>click <a href="http://localhost:3000/resetpassword?token=' + token + '">here</a> to reset your password</p><p><b>This link is valid for 1 hour only</b></p>'
        };

        return new Promise(function (resolve, reject) {

            client.sendMail(email, function (err, info) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(info);
                }
            });

        })
    }
}

module.exports = Email;