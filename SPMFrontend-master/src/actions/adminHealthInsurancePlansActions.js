import axios from 'axios';
import { AdminHealthInsurancePlans, ErrorType } from './ActionType';
import { AdminHealthInsuracePlansUrl } from './ActionURL';

export function addEntry(data) {
  return { type: AdminHealthInsurancePlans.ADD_ENTRY_PLAN, data };
}

export function fetchFromDBAction(data) {
  return { type: AdminHealthInsurancePlans.FETCH_FROM_DB_FOR_ADMIN_HEALTH_INSURANCE_BENEFITS_PLAN, data };
}

export function deleteRowAction(data) {
  return { type: AdminHealthInsurancePlans.DELETE_ENTRY_PLAN, data };
}

export function fetchHealthInsuranceBenefits(company) {
  const Url = `${AdminHealthInsuracePlansUrl.FETCH_HEALTH_BENEFITS}${company}`;
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
  const Url = `${AdminHealthInsuracePlansUrl.UPDATE_HEALTH_BENEFITS}${company}/employeeHealthInsurancePlansPdfData`;
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
  const Url = `${AdminHealthInsuracePlansUrl.DELETE_HEALTH_BENEFITS}${company}/${rowId}`;
  return function (dispatch) {
    axios
      .delete(Url)
      .then(response => {
        console.log('response', response);
        if (response.data !== undefined) {
          callback(response.data);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}
