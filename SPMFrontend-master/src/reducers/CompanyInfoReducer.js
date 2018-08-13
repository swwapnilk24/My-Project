import { CompanyInfo } from '../actions/ActionType';

const initialState = {
  corporateAddress: {
    companyName: '',
    country: '',
    state: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    zip: '',
    numberOfEmployees: '',
    phoneNumber: '',
    faxNumber: '',
    mailId: '',
    website: ''
  },
  branches: []
};
const initialAudit = {
  corporateAddress: [],
  branches: []
};
const defaultState = {
  companyData: initialState,
  auditData: initialAudit
};
const updateAddressInfo = (state, action) => {
  // console.log('working', action);
  // let newState = {};
  const newState = Object.assign({}, state.companyData);
  console.log('new state audit', newState, state, state.companyData);
  // newState.corporateAddress.companyName = 'changed';
  switch (action.data.section) {
    case 'branches':
      // alert('branches');
      newState.branches = action.data.newRows;
      break;
    case 'corporateAddress':
      // alert('corporate address');
      newState.corporateAddress = action.data.newRows;
      break;
    default:
      return newState;
  }
  console.log('new state audit', newState);
  const finalState = Object.assign({}, state, { companyData: newState });
  return finalState;
};

const fetchCompanyData = (state, action) => {
  let newState = {};
  console.log('reducer fetch', state, state.companyData);
  newState = Object.assign({}, state.companyData);
  newState = action.data;
  const finalState = Object.assign({}, state, { companyData: newState });
  console.log('reducer data', action.data);
  return finalState;
};

const fetchCompanyAudit = (state, action) => {
  let newState = {};
  newState = Object.assign({}, state.auditData);
  newState = action.data;
  const finalState = Object.assign({}, state, { auditData: newState });
  console.log('reducer data', action.data);
  return finalState;
};

export default function reducer(state = defaultState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case CompanyInfo.FETCH_COMPANY_DATA:
      st = fetchCompanyData(st, action);
      break;
    case CompanyInfo.UPDATE_ADDRESS_INFO:
      st = updateAddressInfo(st, action);
      break;
    case CompanyInfo.FETCH_COMPANY_AUDIT:
      st = fetchCompanyAudit(st, action);
      break;
    default: {
      return st;
    }
  }
  return st;
}
