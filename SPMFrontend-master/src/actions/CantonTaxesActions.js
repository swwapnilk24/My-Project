import axios from 'axios';
import { ErrorType, CantonTaxes } from './ActionType';
import { CantonTaxesUrl } from './ActionURL';

export function fetchFromDBAction(data) {
  return { type: CantonTaxes.FETCH_FROM_DB, data };
}

export function fetchAllFromDBAction(data) {
  return { type: CantonTaxes.FETCH_FOR_ALL, data };
}

export function updateContonTaxesAction(data) {
  return { type: CantonTaxes.UPDATE_CONTON_TAXES, data };
}

export function FetchAllFromDB() {
  return function (dispatch) {
    axios
      .get(CantonTaxesUrl.FETCH_FOR_ALL)
      .then(response => {
        console.log('response', response);
        dispatch(fetchAllFromDBAction(response.data));
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function saveToDB(dataToBeSaved) {
  return function (dispatch) {
    console.log('input', dataToBeSaved);
    console.log(CantonTaxesUrl.SAVE_TO_DB);
    axios
      .post(CantonTaxesUrl.SAVE_TO_DB, dataToBeSaved)
      .then(response => {
        console.log('response', response);
        dispatch(fetchFromDBAction(response.data));
        dispatch(FetchAllFromDB());
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function FetchFromDB() {
  return function (dispatch) {
    axios
      .get(CantonTaxesUrl.FETCH_FROM_DB)
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

export function deleteRowData(data) {
  return function (dispatch) {
    axios
      .post(CantonTaxesUrl.DELETE_ROW, data)
      .then(response => {
        console.log('response', response);
        dispatch(fetchFromDBAction(response.data));
        dispatch(FetchAllFromDB());
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function checkForInsert(construct, afterSucAdd, data, alreadyExist, ignore, type) {
  return function (dispatch) {
    axios
      .post(CantonTaxesUrl.CHECK_FOR_INSERT, construct)
      .then(response => {
        console.log('response', response);
        console.log('check resp', ignore);
        if (!ignore) {
          if (response.data) {
            afterSucAdd(data, type);
          } else {
            alreadyExist();
          }
        } else {
          afterSucAdd(data, type);
        }
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function updateOnEdit(data) {
  return function (dispatch) {
    axios
      .post(CantonTaxesUrl.UPDATE_ON_EDIT, data)
      .then(response => {
        console.log('update response', response);
        dispatch(fetchFromDBAction(response.data));
        dispatch(FetchAllFromDB());
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function checkForInitialFullUploadService(companyData, files, showError) {
  return function (dispatch) {
    axios
      .post(CantonTaxesUrl.CHECK_FOR_INITIAL_FULL_UPLOAD, companyData)
      .then(response => {
        console.log('full upload response', response.data.ErrorMessage);
        showError(files, response.data.ErrorMessage);
      })
      .catch(err => {
        console.log(err);
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}
