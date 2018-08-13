import _ from 'lodash';
import { success, notFound } from '../../services/response/';
import uuid from 'uuid-v4';
import moment from 'moment';
import { Role } from '.';
import { sendVerificationEmail } from '../../services/emailAuth/emailAuth';
import RegToken from '../registration-tokens/model';
import CompanySubscription from '../company-subscription/model';

export const create = (req, res, next) => {
  Role.create(req.body, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const token = uuid();
      const newData = {};
      newData.company = result.company;
      newData.token = token;
      newData.email = result.emailId;
      sendVerificationEmail(newData);
      insertIntoRegistrationTokens(result, newData, res);
    }
  });
}

const insertIntoRegistrationTokens = (result, newData, res) => {
  RegToken.create(newData, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Role.find(query, select, cursor)
    .then((roles) => roles.map((role) => role.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Role.findById(params.id)
    .then(notFound(res))
    .then((role) => role ? role.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Role.findById(params.id)
    .then(notFound(res))
    .then((role) => role ? _.merge(role, body).save() : null)
    .then((role) => role ? role.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Role.findById(params.id)
    .then(notFound(res))
    .then((role) => role ? role.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const verifyLogin = (req, res, next) => {
  const emailId = req.body.email;
  const password = req.body.password;
  Role.find(
    { emailId, password },
    { company : 1 }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        const company = result[0].company
        CompanySubscription.find(
          { company }, (error, response) => {
            if (error) {
              res.send(error);
            } else {
              const endDate = response[0].endDate;
              const subscriptionValid = verifySubscription(endDate);
              if (response[0].isActive && subscriptionValid) {
                res.send(response);
              } else {
                res.send({ message: 'Sorry, your subscription plan has expired' });
              }
            }
          }
        )
      }
    }
  ).limit(1)
}

const verifySubscription = (date) => {
  const today = new Date();
  const endDate = new Date(date);
  const isValid = moment(today).isSameOrBefore(endDate);
  if (isValid) {
    return true;
  } else {
    return false;
  }
};