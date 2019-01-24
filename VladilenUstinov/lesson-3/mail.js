const nodemailer = require('nodemailer');

const smtpTransport = nodemailer.createTransport('SMTP', {
    service: 'Gmail',
    auth: {
        user: 'vasya@gmail.com',
        pass: '********',
    },
});

smtpTransport.sendMail({
    from: 'Vasya Pupkin <vasya@gmail.com>',
    to: 'petya@gmail.com',
    subject: 'Hello, Petya',
    html: '<b>Hello</b>'
}, (err, response) => {
    if (err) {

    }
    smtpTransport.close();
});