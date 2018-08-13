import axios from 'axios';
import { AdminHealthInsurance, ErrorType } from './ActionType';
import { AdminHealthInsuraceUrl } from './ActionURL';

export function addEntry(data) {
  return { type: AdminHealthInsurance.ADD_ENTRY, data };
}

export function fetchFromDBAction(data) {
  return { type: AdminHealthInsurance.FETCH_FROM_DB_FOR_ADMIN_HEALTH_INSURANCE_BENEFITS, data };
}

export function deleteRowAction(data) {
  return { type: AdminHealthInsurance.DELETE_ENTRY, data };
}

export function fetchHealthInsurancePlansForBenefits(company) {
  const Url = `${AdminHealthInsuraceUrl.FETCH_HEALTH_INSURANCE_PLANS}${company}`;
  console.log('url', Url);
  return function (dispatch) {
    axios
      .get(Url)
      .then(response => {
        console.log('response', response);
        // dispatch(fetchFromDBAction(response.data[0]));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function fetchHealthInsuranceBenefits(company) {
  const Url = `${AdminHealthInsuraceUrl.FETCH_HEALTH_BENEFITS}${company}`;
  console.log('url', Url);
  return function (dispatch) {
    axios
      .get(Url)
      .then(response => {
        console.log('response', response);
        if (response.data[0] !== undefined) {
          dispatch(fetchFromDBAction(response.data[0]));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function updateHealthInsuranceBenefits(company, newHealthInsuranceBenefit) {
  const Url = `${AdminHealthInsuraceUrl.UPDATE_HEALTH_BENEFITS}${company}`;
  return function (dispatch) {
    axios
      .put(Url, newHealthInsuranceBenefit)
      .then(response => {
        console.log('response', response);
        if (response.data[0] !== undefined) {
          dispatch(fetchFromDBAction(response.data[0]));
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function deleteHealthInsuranceBenefitService(company, rowId, callback) {
  const Url = `${AdminHealthInsuraceUrl.DELETE_HEALTH_BENEFITS}${company}/${rowId}`;
  return function (dispatch) {
    axios
      .delete(Url)
      .then(response => {
        console.log('response', response);
        callback(response.data);
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}
