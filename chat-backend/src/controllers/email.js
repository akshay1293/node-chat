var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var Promise = require('promise');
var jwt = require('jsonwebtoken');
var config = require('../../config');



class Email {

    static sendTo(to, type) {

        var options = {
            auth: {
                api_user: 'daffodil_sunil',
                api_key: 'sunil786'
            }
        }

        var client = nodemailer.createTransport(sgTransport(options));
        var token = jwt.sign({ email: to }, config.secret, { expiresIn: '1h' });
        var html;
        if (type === "reset") {

            html = '<p>Hi,<br><br>Looks like you requested a new password<br>If that sounds right click the below link to enter a new passsword<br><br><a href="http://localhost:3000/resetpassword?token=' + token + '">reset password</a></p><p><b>This link is valid for 1 hour only</b></p>'
        } else {

            html = '<p>Hi,<br><br>Welcome to node chat application<br>If that sounds right click the below link to confirm your email<br><br><a href="http://localhost:3005/confirmAccount?token=' + token + '">confirm</a></p><p><b>This link is valid for 1 hour only</b></p>'
        }

        var email = {
            from: 'support@node-chat.com',
            to: to,
            subject: 'Account Confirmation',
            //text: 'Your chat account has been created succesfully',
            html: html,
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