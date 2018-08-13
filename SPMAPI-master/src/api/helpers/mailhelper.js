'use strict'
const nodemailer = require('nodemailer')

export function createTestAccount () {
  let transporter = nodemailer.createTransport({
    // host: 'smtp.gmail.com',
    service: 'gmail',
    port: 25,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'Your Gmail id', // generated ethereal user
      pass: 'Gmail Password'  // generated ethereal password
    },
    tls: {
      rejectedUnauthorized: false
    }
  })

  let mailOptions = {
    from: 'maheshn10@gmail.com', // sender address
    to: 'maheshn10@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // plain text body
    html: '<b>Hello world?</b>' // html body
  }

    // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message sent: %s', info.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  })
}
