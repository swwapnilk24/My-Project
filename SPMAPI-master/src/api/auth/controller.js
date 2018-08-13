import _ from 'lodash'
import moment from 'moment';
import { sign } from '../../services/jwt'
import { success } from '../../services/response/'
import Employee from '../employee/model';
import CompanySubscription from '../company-subscription/model';


export const login = ({ user }, res, next) => {
  sign(user.id, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      const userId = user.id;
      const projection = {
        'personalInformation.personalInformation.personalInformation.firstName': 1,
        'personalInformation.personalInformation.personalInformation.lastName': 1,
        'jobInformation.employmentDetail.keyJobAttribute.position': 1,
        'personalInformation.biographicalInformation.biographicalInformation.employeeId': 1,
        'company': 1
      };
      Employee.findOne({userId}, projection, (err, result) => {
        if (err) {
          res.send(err);
        } else {
          const userData = {};
          const token = response;
          userData.roles = user.roles;
          userData.firstname = result.personalInformation.personalInformation.personalInformation.firstName;
          userData.lastname = result.personalInformation.personalInformation.personalInformation.lastName;
          // userData.position = result.jobInformation.employmentDetail.keyJobAttribute.position;
          // userData.employeeId = result.personalInformation.biographicalInformation.biographicalInformation.employeeId;
          userData.company = result.company;
          userData.id = result['_id'];
          checkCompanyStatus(userData, token, res);
          // res.send(userData);
        }
      });
    }
  })
};

const checkCompanyStatus = (userData, token, res) => {
  CompanySubscription.findOne(
    { company: userData.company }, (error, response) => {
      if (error) {
        res.send(error);
      } else {
        const endDate = response.endDate;
        const subscriptionValid = verifySubscription(endDate);
        const isHrAdmin = userData.roles.includes('hradmin');
        // console.log(isHrAdmin, userData.roles);
        if (response.isActive && subscriptionValid && isHrAdmin) {
          res.send({ user: userData, token });
        } else {
          res.send({ message: 'Sorry, your subscription plan has expired' });
        }
      }
    }
  )
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
