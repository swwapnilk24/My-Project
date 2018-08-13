import _ from 'lodash'
import uuid from 'uuid-v4';
import { success, notFound } from '../../services/response/'
import { User } from '.'
import Employee from '../employee/model';
import { sendVerificationEmail } from '../../services/emailAuth/emailAuth';
import RegToken from '../registration-tokens/model';

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  User.find(query, select, cursor)
    .then((users) => users.map((user) => user.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.view() : null)
    .then(success(res))
    .catch(next)

export const showMe = ({ user }, res) =>
  res.json(user.view(true))

  // Allowing hradmins only
export const create = (req, res, next) => {
  // console.log(req.body);
  const roles = ['hrAdmin'];
  req.body.roles = roles;
  User.create(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const emailInformation = {
        emailAddress: req.body.email,
        emailType: 'official',
        isPrimary: 'Yes'
      };
      const empObj = {
        'identify.identify.identify.company': req.body.company,
        'company': req.body.company,
        'personalInformation.personalInformation.personalInformation.firstName': req.body.firstName,
        'personalInformation.personalInformation.personalInformation.lastName': req.body.lastName,
        'personalInformation.contactInformation.emailInformation': [emailInformation],
        'userId': result['_id']
        // 'password': req.body.password,
        // 'role': 'HrAdmin'
      };
      Employee.create(empObj, (err, response) => {
        if (err) {
          res.send(err);
        } else {
          const token = uuid();
          const newData = {};
          newData.company = req.body.company;
          newData.token = token;
          newData.email = req.body.email;
          sendVerificationEmail(newData);
          insertIntoRegTokens(response, newData, res, next);
        }
      });
    }
  });
    // .then((user) => user.view(true))
    // .then(success(res, 201))
    // .catch((err) => {
    //   /* istanbul ignore else */
    //   if (err.name === 'MongoError' && err.code === 11000) {
    //     res.status(409).json({
    //       valid: false,
    //       param: 'email',
    //       message: 'email already registered'
    //     })
    //   } else {
    //     next(err)
    //   }
    // })
}

const insertIntoRegTokens = (result, newData, res, next) => {
  RegToken.create(newData, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};


export const update = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isAdmin = user.role === 'admin'
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate && !isAdmin) {
        res.status(401).json({
          valid: false,
          message: 'You can\'t change other user\'s data'
        })
        return null
      }
      return result
    })
    .then((user) => user ? _.merge(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const updatePassword = ({ bodymen: { body }, params, user }, res, next) =>
  User.findById(params.id === 'me' ? user.id : params.id)
    .then(notFound(res))
    .then((result) => {
      if (!result) return null
      const isSelfUpdate = user.id === result.id
      if (!isSelfUpdate) {
        res.status(401).json({
          valid: false,
          param: 'password',
          message: 'You can\'t change other user\'s password'
        })
        return null
      }
      return result
    })
    .then((user) => user ? user.set({ password: body.password }).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  User.findById(params.id)
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)
