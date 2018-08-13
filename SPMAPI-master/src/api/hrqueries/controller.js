import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { HRQueries } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
HRQueries.create(body)
    .then((hrQueries) => hrQueries.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) => {
    HRQueries.findById(params.id)
    .then(notFound(res))
    .then((hrQueries) => hrQueries ? hrQueries.view() : null)
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) => {
    // const nodemailer = require('nodemailer');
    
    // const transporter = nodemailer.createTransport({
    //   service: 'bizmail',
    //   auth: {
    //     user: 'Surendranadh@mcbitsstech.com,',
    //     pass: 'Mcbitss1000%'
    //   }
    // });
    
    // const mailOptions = {
    //   from: 'Surendranadh@mcbitsstech.com',
    //   to: 'surendraraj3@outlook.com',
    //   subject: 'Sending Email using Node.js',
    //   text: 'That was easy!'
    // };
    
    // transporter.sendMail(mailOptions, function(error, info){
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log('Email sent: ' + info.response);
    //   }
    // });
    HRQueries.find(query, select, cursor)
    .then((hrQueries) => hrQueries.map((hrQuery) => hrQuery.view()))
    .then(success(res))
    .catch(next)
}
