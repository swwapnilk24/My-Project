import axios from 'axios';
import AppConfig from '../config';
import { otherBills } from './ActionType';

const MEDICAL_BILL = 'medicalBills';
const LTA_BILL = 'ltaBills';
const IND_SAVING_BILL = 'indSavingBills';
const RETIRAL_BENIFITS = 'retiralBenifits';
const TAX_BENIFITS = 'taxbenifits';

export function addNewBill(billType) {
  return (dispatch) => {
    dispatch({ type: otherBills.ADD_NEW_BILL, billType });
  };
}

export function updateBillProperty(billType, value, objType, id) {
  return (dispatch) => {
    dispatch({ type: otherBills.UPDATE_BILL_PROPERTY, billType, value, objType, id });
  };
}

export function deletebill(billObj, billType) {
  let id = '';
  /* eslint-disable */
  id = billObj._id;
  /* eslint-enable */
  return (dispatch) => {
    if (billObj.addeddocument) {
      dispatch({ type: otherBills.DELETE_BILL, billObj, billType });
    } else {
      axios.get(`${AppConfig.BASE_URL}employees/otherbills/5a4f7dfe6de8d49ee38f73e4/${billType}/${id}`)
      .then((response) => {
        console.log(response);
        dispatch({ type: otherBills.DELETE_BILL, billObj, billType });
      });
    }
  };
}
export function resetBillsUploaded(billType) {
  return (dispatch) => {
    dispatch({ type: otherBills.RESET_BILL_UPLOADED, billType });
  };
}

export function getBills(billType) {
  const id = '5a4f7dfe6de8d49ee38f73e4';
  let posturl = '';
  if (billType === MEDICAL_BILL) {
    posturl = 'employees/medicalbills';
  }
  if (billType === LTA_BILL) {
    posturl = 'employees/ltabills';
  }
  if (billType === RETIRAL_BENIFITS) {
    posturl = 'employees/retiralbenifits';
  }
  if (billType === TAX_BENIFITS) {
    posturl = 'employees/taxbenifits';
  }
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}${posturl}/${id}`)
    .then((response) => {
      dispatch({ type: otherBills.GET_BILLS, billType, bills: response.data[0] });
    });
  };
}

export function updateBills(billType, data) {
  const obj = { id: '5a4f7dfe6de8d49ee38f73e4', savings: data };
  let posturl = '';
  if (billType === MEDICAL_BILL) {
    posturl = 'employees/medicalbills';
  }
  if (billType === LTA_BILL) {
    posturl = 'employees/ltabills';
  }
  if (billType === IND_SAVING_BILL) {
    posturl = 'employees/indtaxsavings';
  }
  if (billType === RETIRAL_BENIFITS) {
    posturl = 'employees/retiralbenifits';
  }
  if (billType === TAX_BENIFITS) {
    posturl = 'employees/taxbenifits';
  }
  return (dispatch) => {
    axios.post(`${AppConfig.BASE_URL}${posturl}`, obj)
    .then((response) => {
      dispatch({ type: otherBills.GET_BILLS, billType, bills: response.data[0] });
    });
  };
}
export function postFile(data, billType) {
  const uploaders = data.map(file => {
    // Initial FormData
    const formData = new FormData();
    formData.append('file', file);
    formData.append('id', '898989898989');
    // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    return axios.post(`${AppConfig.BASE_URL}employees/upload/898989898989`, formData
    ).then(response => {
      console.log(response.data);
    });
  });

    // Once all the files are uploaded
  return (dispatch) => {
    axios.all(uploaders).then(() => {
      dispatch({ type: otherBills.UPLOAD_BILL_SUCCESS, billType, message: 'success' });
    });
  };
}

// Delete Employee Retiral Benifit
export function deleteEmpRB(billType, deleteid) {
  const id = '5a4f7dfe6de8d49ee38f73e4';
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}employees/retiralbenifits/delete/${id}/${deleteid}`)
    .then((response) => {
      dispatch({ type: otherBills.GET_BILLS, billType, bills: response.data[0] });
    });
  };
}
// Delete Employee Retiral Benifit
export function deleteEmpTB(billType, deleteid) {
  const id = '5a4f7dfe6de8d49ee38f73e4';
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}employees/taxbenifits/delete/${id}/${deleteid}`)
    .then((response) => {
      dispatch({ type: otherBills.GET_BILLS, billType, bills: response.data[0] });
    });
  };
}

// Get Employee Retiral Benifit Nominees
export function getRetiralNominees(nomineeType) {
  const id = '5a4f7dfe6de8d49ee38f73e4';
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}employees/nominee/${id}/${nomineeType}`)
    .then((response) => {
      dispatch({ type: otherBills.GET_NOMINEES, data: response.data[0] });
    });
  };
}
// Post Employee Retiral Benifit Nominees
export function postRetiralNominees(nomineeType, data) {
  const obj = { id: '5a4f7dfe6de8d49ee38f73e4', nominee: data };
  return (dispatch) => {
    axios.post(`${AppConfig.BASE_URL}employees/nominee`, obj)
    .then((response) => {
      dispatch({ type: otherBills.ADD_NOMINEE, data: response.data[0] });
    });
  };
}

// Delete Employee Retiral Benifit
export function deleteRetiralNominee(deleteid) {
  const id = '5a4f7dfe6de8d49ee38f73e4';
  return (dispatch) => {
    axios.delete(`${AppConfig.BASE_URL}employees/nominee/${id}/${deleteid}`)
    .then((response) => {
      dispatch({ type: otherBills.DELETE_NOMINEE, data: response.data, id: deleteid });
    });
  };
}
