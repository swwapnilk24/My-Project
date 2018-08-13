import axios from 'axios';
import { ErrorType, EmployeeType } from './ActionType';
import config from '../config';
// import { server } from './config';

export function approveClaims(employeeData) {
  return function (dispatch) {
    // const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    // const LOGINCONFIG = Configs.LOGINCONFIG;
    axios
      .post(`${config.BASE_URL}employees/approveClaims`, employeeData)
      .then(response => {
        console.log(response);
        dispatch({
          type: EmployeeType.CLAIM_APPROVE,
          claimsInfo: employeeData
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function rejectClaims(employeeData) {
  return function (dispatch) {
    // const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    // const LOGINCONFIG = Configs.LOGINCONFIG;
    axios
      .post(`${config.BASE_URL}employees/rejectClaims`, employeeData)
      .then(response => {
        console.log(response);
        dispatch({
          type: EmployeeType.CLAIM_REJECT,
          claimsInfo: employeeData
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function approveEnrollments(employeeData) {
  return function (dispatch) {
    // const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    // const LOGINCONFIG = Configs.LOGINCONFIG;
    axios
      .post(`${config.BASE_URL}employees/approveEnrollments`, employeeData)
      .then(response => {
        console.log(response);
        dispatch({
          type: EmployeeType.ENROLLMENT_APPROVE,
          enrollmentInfo: employeeData
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

