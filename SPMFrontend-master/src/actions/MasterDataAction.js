import axios from 'axios';
import { MasterType, ErrorType } from './ActionType';
import { deleteDocument, checkForInsert, MasterDataTypeUrl, partialMasterDataUpload, emptyMasterDataCollection, initialCheckForFullUpload, replaceAndUpdateDocument } from './ActionURL';
import AppConfig from '../config';

// export function getMasterData() {
//   return { type: MasterType.GET_MASTER_DATA };
// }

export function getMasterDataFromDB(masterData) {
  return {
    type: MasterType.GET_MASTER_DATA_INFO,
    data: masterData
  };
}
export function updateMasterDataLocally(masterData) {
  return {
    type: MasterType.UPDATE_MASTER_DATA_LOCALLY,
    data: masterData
  };
}
export function getErrorCodesMasterDataFromDB(masterData) {
  return {
    type: MasterType.GET_ERROR_CODES_MASTER_DATA,
    data: masterData
  };
}

export function createMasterDataType(masterData) {
  // console.log('Welcome Data', masterData);
  return function (dispatch) {
    axios
      .post(MasterDataTypeUrl.CREATE_MASTERDATATYPE, masterData)
      .then(response => {
        dispatch({ type: MasterType.CREATE_MASTER_DATA_TYPE, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type:MasterDataType.CREATE_MASTER_DATA_TYPE };
}

export function partialUploadMasterData(masterData) {
  // console.log('Welcome Data', masterData);
  return function (dispatch) {
    axios
      .post(partialMasterDataUpload.PARTIAL_MASTER_DATA_UPLOAD, masterData)
      .then(response => {
        dispatch({ type: MasterType.CREATE_MASTER_DATA_TYPE, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type:MasterDataType.CREATE_MASTER_DATA_TYPE };
}

export function replaceAndUpdateMasterData(masterData) {
  // console.log('Welcome Data', masterData);
  return function (dispatch) {
    axios
      .post(replaceAndUpdateDocument.REPLACE_EXISTING_DOCUMENT, masterData)
      .then(response => {
        dispatch({ type: MasterType.CREATE_MASTER_DATA_TYPE, data: response.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type:MasterDataType.CREATE_MASTER_DATA_TYPE };
}

export function emptyMasterDataCollectionService(validationData) {
  // console.log('Welcome Data', masterData);
  return function (dispatch) {
    axios
      .post(emptyMasterDataCollection.EMPTY_MASTER_DATA_COLLECTION, validationData)
      // .then(response => {
      //   // console.log('Service', response.data);
      //   // dispatch({ type: MasterDataType.EMPTY_MASTER_DATA_COLLECTION, masterDataTypes: masterData });
      // })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type:MasterDataType.CREATE_MASTER_DATA_TYPE };
}

export function initialCheckForFullUploadService(validationData, files, type, uploadLogic) {
  // console.log('Welcome Data', masterData);
  return function (dispatch) {
    axios
      .post(initialCheckForFullUpload.INITIAL_CHECK_FOR_FULL_UPLOAD, validationData)
      .then(response => {
        // dispatch({ type: MasterDataType.EMPTY_MASTER_DATA_COLLECTION, masterDataTypes: masterData });
        uploadLogic(files, type, response.data.allowInitialUpload);
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type:MasterDataType.CREATE_MASTER_DATA_TYPE };
}
export function deleteDocucmentService(dataToBeDeleted) {
  // console.log('Welcome Data', masterData);
  return function (dispatch) {
    axios
      .post(deleteDocument.DELETE_DOCUMENT, dataToBeDeleted)
      .then(response => {
        dispatch({ type: MasterType.CREATE_MASTER_DATA_TYPE, data: response.data });
        // dispatch({ type: MasterDataType.EMPTY_MASTER_DATA_COLLECTION, masterDataTypes: masterData });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type:MasterDataType.CREATE_MASTER_DATA_TYPE };
}
export function checkForInsertService(dataToBeInserted, addSucessful, alreadyExist) {
  // console.log('Welcome Data', masterData);
  return function (dispatch) {
    axios
      .post(checkForInsert.CHECK_FOR_INSERT, dataToBeInserted)
      .then(response => {
        console.log('Service', response.data);
        addSucessful(response.data, alreadyExist, dataToBeInserted);
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type:MasterDataType.CREATE_MASTER_DATA_TYPE };
}

// Get Retiral Benifits By Country
export function getRBByCountry(countryName) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}retiralbenifits/country/${countryName}`)
    .then((response) => {
      dispatch({ type: MasterType.GET_RETIRAL_BENIFITS, data: response.data });
    });
  };
}

// Get Tax Benifits By Country
export function getTBByCountry(countryName) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}taxbenifit/country/${countryName}`)
    .then((response) => {
      dispatch({ type: MasterType.GET_TAX_BENIFITS, data: response.data });
    });
  };
}
export function getSwizzDeductions() {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}swizzdeductions`)
    .then((response) => {
      dispatch({ type: MasterType.GET_SWIZZ_DEDUCTIONS, data: response.data });
    });
  };
}

export function getSwissCantons() {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}swisscontons`)
    .then((response) => {
      dispatch({ type: MasterType.GET_SWISS_CANTONS, data: response.data });
    });
  };
}
