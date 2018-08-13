import axios from 'axios';
import { Registration, ErrorType } from './ActionType';
import {
  RegistrationURL,
  CompanyActionUrl,
  // EmployeeUrl,
  // UserUrl,
  LoginUrl
 } from './ActionURL';
import { Configs } from './ActionConfigs';
import AppConfig from '../config';

export function saveRegistrationFormData(addData, callback) {
  const newData = { ...addData };
  newData.access_token = AppConfig.MASTER_TOKEN;
  console.log('Add Data', newData);
  return function (dispatch) {
    axios
      .post(CompanyActionUrl.FIND_COMPANY, newData)
      .then(response => {
        console.log('response.data', response.data);
        if (response.data.userId) {
          console.log(response.data, 'company created');
          callback(response.data);
        } else {
          callback({ message: 'Company already exists' });
        }
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
      });
  };
}

export function getLoginDetails() {
  return function (dispatch) {
    axios
      .get(RegistrationURL.ADD_USER_URL, Configs.ORG_CHART_CONFIG)
      .then(loginResp => {
        dispatch({ type: Registration.GET_LOGIN_DETAILS, data: loginResp.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
      });
  };
}

export function verifyCredentials(loginDetails, callback) {
  axios
    .post(LoginUrl.AUTHENTICATE, loginDetails)
    .then(response => {
      console.log(response);
      if (response.status === 200) {
        callback(response.data);
      }
    })
    .catch(err => {
      console.log(err);
    });
}

