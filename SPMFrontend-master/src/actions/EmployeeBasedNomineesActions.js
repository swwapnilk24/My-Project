import axios from 'axios';
import { ErrorType, EmployeeBasedNominees } from './ActionType';
import { EmployeeBasedNomineesURL } from './ActionURL';

export function fetchFromDBAction(data) {
  return { type: EmployeeBasedNominees.FETCH_FROM_DB, data };
}

export function updateNominees(data) {
  return { type: EmployeeBasedNominees.UPDATE_NOMINEES, data };
}

export function deleteNomineesAction(data) {
  return { type: EmployeeBasedNominees.DELETE_NOMINEE, data };
}
// 5a55d170bc2c560baaf06699/health
export function fetchEmployeeNominees(employeeKey, plan) {
  const Url = `${EmployeeBasedNomineesURL.FETCH_NOMINEES}${employeeKey}/${plan}`;
  console.log('url', Url);
  return function (dispatch) {
    axios
      .get(Url)
      .then(response => {
        console.log('response', response);
        dispatch(fetchFromDBAction(response.data[0]));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

// export function fetchEmployeePlan(id, position) {
//   const Url = `${EmployeeBasedNomineesURL.FETCH_EMPLOYEE_PLAN}${id}/${position}`;
//   console.log('url', Url);
//   return function (dispatch) {
//     axios
//       .get(Url)
//       .then(response => {
//         console.log('response', response);
//         dispatch(fetchFromDBAction(response.data[0]));
//       })
//       .catch(err => {
//         console.log(err);
//         dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
//       });
//   };
// }

export function saveNominees(data) {
  return function (dispatch) {
    axios
      .post(EmployeeBasedNomineesURL.SAVE_NOMINEES, data)
      .then(response => {
        console.log('response', response);
        dispatch(fetchFromDBAction(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function deleteNominees(employeeKey, recordId, removeRecord) {
  const Url = `${EmployeeBasedNomineesURL.DELETE_NOMINEES}${employeeKey}/${recordId}`;
  console.log('url', Url, employeeKey, recordId);
  return function (dispatch) {
    axios
      .delete(Url)
      .then(response => {
        console.log('response', response);
        if (response.data.message === 'successfully deleted') {
          removeRecord(recordId);
        } else {
          alert('something went wrong, please delete record again');
        }
        // dispatch(fetchFromDBAction(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function fetchEmployeePlanData(companyId, employeeCompany, position, displayThisOnUi) {
  const Url = `${EmployeeBasedNomineesURL.FETCH_EMPLOYEE_PLAN_DATA}${companyId}/${employeeCompany}/${position}`;
  // console.log('url', Url, employeeKey, recordId);
  return function (dispatch) {
    axios
      .get(Url)
      .then(response => {
        console.log('test plan data', response.data);
        if (response.data.message === 'successfull') {
          displayThisOnUi(response.data.response);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}
