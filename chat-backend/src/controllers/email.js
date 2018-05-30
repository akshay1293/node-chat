var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var Promise = require('promise');
var jwt = require('jsonwebtoken');
var config = require('config');



class Email {

    static sendTo(to, type, user) {

        var options = {
            auth: {
                api_user: 'daffodil_sunil',
                api_key: 'sunil786'
            }
        }

        var client = nodemailer.createTransport(sgTransport(options));
        var token = jwt.sign({ user: { email: to, handle: user } }, config.secret, { expiresIn: 86400 });
        var html;
        var subject;

        if (type === "reset") {
            subject = "Reset Password";
            html = '<p>Hi,<br><br>Looks like you requested a new password<br>If that sounds right click the below link to enter a new passsword<br><br><a href="' + config.get('client') + 'resetpassword?token=' + token + '&user=' + user + '">reset password</a></p><p><b>This link is valid for 1 hour only</b></p>'
        } else {
            subject = "Account Confirmation";
            html = '<p>Hi,<br><br>Welcome to node chat application<br>click the below link to confirm your email<br><br><a href="' + config.get("host") + 'confirmAccount?token=' + token + '&user=' + user + '">confirm</a></p><p><b>This link is valid for 1 hour only</b></p>'

        }

        var email = {
            from: 'support@node-chat.com',
            to: to,
            subject: subject,
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