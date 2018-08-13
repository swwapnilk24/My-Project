import nodemailer from 'nodemailer';

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'mcbitssadm@gmail.com', // generated ethereal user
    pass: 'welcome@123'  // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendVerificationEmail = (role) => {

  const link = `
    <a href='http://localhost:1235/#/emailverification/?${role.token}'>Click here to confirm your registration to SPM.</a>
  `;

  const message = {
    from: 'mcbitssadm@gmail.com',
    to: role.email,
    subject: 'Confirm your registration to SPM',
    html: link
  };

  // send mail with defined transport object
  transporter.sendMail(message, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  });
};

// info object contains
// {
//   "accepted": [
//     "bathulanikhil98@gmail.com"
//   ],
//     "rejected": [],
//       "envelopeTime": 836,
//         "messageTime": 1317,
//           "messageSize": 361,
//             "response": "250 2.0.0 OK 1517470025 p34sm8884414wrc.34 - gsmtp",
//               "envelope": {
//     "from": "mcbitssadm@gmail.com",
//       "to": [
//         "bathulanikhil98@gmail.com"
//       ]
//   },
//   "messageId": "<0d8f01b7-e606-3a96-005d-aa745ddab8b1@gmail.com>"
// }
