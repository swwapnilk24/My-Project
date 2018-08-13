import { findIndex, remove, map } from 'lodash';
import { otherBills } from '../actions/ActionType';

const MEDICAL_BILL = 'medicalBills';
const LTA_BILL = 'ltaBills';
const IND_SAVING_BILL = 'indSavingBills';
const RETIRAL_BENIFITS = 'retiralBenifits';
const TAX_BENIFITS = 'taxbenifits';

const initialState = {
  message: 'Test Message',
  medicalbillsUploaded: false,
  ltabillsUploaded: false,
  indSavingbillsUploaded: false,
  medicalBillArray: [],
  ltaBillArray: [],
  indSavingBillArray: [],
  addedRetiralBenifits: [],
  retiralBenifitsArray: [],
  addedTaxBenifits: [],
  taxBenifitsArray: [],
  nominees: []
};

const addNewBill = (state, action) => {
  const newState = [];
  const obj = {
    _id: Math.floor(new Date().valueOf() * Math.random()).toString(),
    amount: '',
    document: '',
    addeddocument: ''
  };
  const newObj = {};
  if (action.billType === MEDICAL_BILL) {
    Object.assign(newState, state.medicalBillArray);
    newState.push(obj);
    Object.assign(newObj, state, { medicalBillArray: newState });
  }
  if (action.billType === LTA_BILL) {
    Object.assign(newState, state.ltaBillArray);
    newState.push(obj);
    Object.assign(newObj, state, { ltaBillArray: newState });
  }

  return newObj;
};

const updateBillProperty = (state, action) => {
  const newState = [];
  if (action.billType === MEDICAL_BILL) {
    Object.assign(newState, state.medicalBillArray);
  }
  if (action.billType === IND_SAVING_BILL) {
    Object.assign(newState, state.indSavingBillArray);
  }
  if (action.billType === LTA_BILL) {
    Object.assign(newState, state.ltaBillArray);
  }
  const index = findIndex(newState, ['_id', action.id]);
  newState[index][action.objType] = action.value;
  const newObj = {};
  if (action.billType === MEDICAL_BILL) {
    Object.assign(newObj, state, { medicalBillArray: newState });
  }
  if (action.billType === LTA_BILL) {
    Object.assign(newObj, state, { ltaBillArray: newState });
  }
  if (action.billType === IND_SAVING_BILL) {
    Object.assign(newObj, state, { indSavingBillArray: newState });
  }

  return newObj;
};

const deleteBill = (state, action) => {
  const billArray = [];
  if (action.billType === MEDICAL_BILL) {
    Object.assign(billArray, state.medicalBillArray);
  }
  if (action.billType === LTA_BILL) {
    Object.assign(billArray, state.ltaBillArray);
  }
  if (action.billType === IND_SAVING_BILL) {
    Object.assign(billArray, state.indSavingBillArray);
  }
  /* eslint-disable */
  remove(billArray, { _id: action.billObj._id });
  /* eslint-enable */
  const newObj = {};
  if (action.billType === MEDICAL_BILL) {
    Object.assign(newObj, state, { medicalBillArray: billArray });
  }
  if (action.billType === LTA_BILL) {
    Object.assign(newObj, state, { ltaBillArray: billArray });
  }
  if (action.billType === IND_SAVING_BILL) {
    Object.assign(newObj, state, { indSavingBillArray: billArray });
  }
  return newObj;
};

const addNominee = (state, action) => {
  const nomineeArray = Object.assign([], this.state.nominees);
  nomineeArray.push(action.data);
  return Object.assign({}, state, { nominees: nomineeArray });
};

const deleteNominee = (state, action) => {
  const nomineeArray = Object.assign([], this.state.nominees);
   /* eslint-disable */
   remove(nomineeArray, { _id: action.data.id });
   /* eslint-enable */
  return Object.assign({}, state, { nominees: nomineeArray });
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case otherBills.GET_BILLS: {
      if (action.billType === MEDICAL_BILL) {
        st = {
          ...state,
          medicalBillArray: action.bills.medicalBills
        };
      }
      if (action.billType === LTA_BILL) {
        st = {
          ...state,
          ltaBillArray: action.bills.ltaBills
        };
      }
      if (action.billType === IND_SAVING_BILL) {
        st = {
          ...state,
          indSavingBillArray: action.bills.taxSavingBills
        };
      }
      if (action.billType === RETIRAL_BENIFITS) {
        const finalArray = map(action.bills.retiralBenifits, (row) => {
          let obj = {};
          obj = row.retiralId;
          return obj;
        });
        st = {
          ...state,
          addedRetiralBenifits: action.bills.retiralBenifits,
          retiralBenifitsArray: finalArray
        };
      }
      if (action.billType === TAX_BENIFITS) {
        const finalArray = map(action.bills.taxBenifits, (row) => {
          let obj = {};
          obj = row.benifitId;
          return obj;
        });
        st = {
          ...state,
          addedTaxBenifits: action.bills.taxBenifits,
          taxBenifitsArray: finalArray
        };
      }
      break;
    }

    case otherBills.ADD_NEW_BILL:
      return addNewBill(state, action);

    case otherBills.UPDATE_BILL_PROPERTY:
      return updateBillProperty(state, action);

    case otherBills.DELETE_BILL:
      return deleteBill(state, action);

    case otherBills.UPLOAD_BILL_SUCCESS: {
      if (action.billType === MEDICAL_BILL) {
        st = {
          ...state,
          medicalbillsUploaded: true
        };
      }
      if (action.billType === LTA_BILL) {
        st = {
          ...state,
          ltabillsUploaded: true
        };
      }
      if (action.billType === IND_SAVING_BILL) {
        st = {
          ...state,
          indSavingbillsUploaded: true
        };
      }
      break;
    }
    case otherBills.RESET_BILL_UPLOADED: {
      if (action.billType === MEDICAL_BILL) {
        st = {
          ...state,
          medicalbillsUploaded: false
        };
      }
      if (action.billType === LTA_BILL) {
        st = {
          ...state,
          ltabillsUploaded: false
        };
      }
      if (action.billType === IND_SAVING_BILL) {
        st = {
          ...state,
          indSavingbillsUploaded: false
        };
      }
      break;
    }

    case otherBills.GET_NOMINEES: {
      st = {
        ...state,
        nominees: this.action.data
      };
      break;
    }
    case otherBills.ADD_NOMINEE:
      return addNominee(state, action);

    case otherBills.DELETE_NOMINEE:
      return deleteNominee(state, action);

    default: {
      return st;
    }
  }
  return st;
}
