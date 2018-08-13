import axios from 'axios';
import { CompanyInfo, ErrorType } from './ActionType';
import { CompanyActionUrl } from './ActionURL';


export function updateEmployee(data) {
  return { type: CompanyInfo.UPDATE_ADDRESS_INFO, data };
}

export function fetchCompanyData(test) {
  console.log('service', test);
  const Url = `${CompanyActionUrl.Fetch_From_DB}${test}`;
  console.log('company service url', Url);
  return function (dispatch) {
    axios
      .get(Url)
      .then(response => {
        console.log('compnay service data', response.data);
        if (response.data.length > 0) {
          dispatch({ type: CompanyInfo.FETCH_COMPANY_DATA, data: response.data[0] });
        }
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type: EmployeeType.GET_ALL_EMPLOYEE, data: test };
}

export function fetchCompanyAudit() {
  return function (dispatch) {
    axios
      .post(CompanyActionUrl.FETCH_COMPANY_AUDIT, {})
      .then(response => {
        console.log('company audit', response.data);
        if (response.data.length > 0) {
          dispatch({ type: CompanyInfo.FETCH_COMPANY_AUDIT, data: response.data[0] });
        }
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function sendCompnayAudit(companyAudit) {
  return function (dispatch) {
    axios
      .post(CompanyActionUrl.SEND_COMPANY_AUDIT, companyAudit)
      .then(response => {
        console.log('company audit', response.data);
        dispatch({ type: CompanyInfo.FETCH_COMPANY_AUDIT, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function sendCompnayData(companyData) {
  console.log('service', companyData);
  return function (dispatch) {
    axios
      .post(CompanyActionUrl.SEND_COMPANY_DATA, companyData)
      .then(response => {
        console.log('no response from server', response.data);
        dispatch({ type: CompanyInfo.FETCH_COMPANY_DATA, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type: EmployeeType.GET_ALL_EMPLOYEE, data: test };
}

export function authenticateEmail(token, callback) {
  console.log(token);
  axios
    .put(`${CompanyActionUrl.EMAIL_AUTH_URL}/${token}`)
    .then(response => {
      console.log(response, 'after auth');
      callback(response);
    })
    .catch(err => {
      console.log(err);
    }
  );
}
