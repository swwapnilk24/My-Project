import { remove } from 'lodash';

import { PayRoll } from '../actions/ActionType';

const DEFAULT_STATE = {
  masterRetiralBenifits: [],
  masterTaxBenifits: [],
  payrollEmpList: [],
  swissEmpPayrollPosted: false,
  currentPayrollId: '',
  currentEmpPayroll: {},
  empPayslipList: [],
  empPayrolldetails: {}
};

// Get Retiral Benifits by Company and country
const getRBByCompany = (state, action) => {
  const newState = Object.assign({}, state, { masterRetiralBenifits: action.data });
  return newState;
};

// Post Master Retiral Benifit
const postMasterRB = (state, action) => {
  const retiralBenifits = Object.assign([], state.masterRetiralBenifits);
  retiralBenifits.push(action.data);
  const newState = Object.assign({}, state, { masterRetiralBenifits: retiralBenifits });
  return newState;
};

// Deete Master Retiral Benifit
const deleteMasterRB = (state, action) => {
  const retiralBenifits = Object.assign([], state.masterRetiralBenifits);
  //* eslint-disable */
  remove(retiralBenifits, { id: action.id });
  /* eslint-enable */
  const newState = Object.assign({}, state, { masterRetiralBenifits: retiralBenifits });
  return newState;
};

// Get Tax Benifits by Company and country
const getTBByCompany = (state, action) => {
  const newState = Object.assign({}, state, { masterTaxBenifits: action.data });
  return newState;
};

// Post Master Tax Benifit
const postMasterTB = (state, action) => {
  const taxBenifits = Object.assign([], state.masterTaxBenifits);
  taxBenifits.push(action.data);
  const newState = Object.assign({}, state, { masterTaxBenifits: taxBenifits });
  return newState;
};

// Deete Master Tax Benifit
const deleteMasterTB = (state, action) => {
  const taxBenifits = Object.assign([], state.masterTaxBenifits);
  //* eslint-disable */
  remove(taxBenifits, { id: action.id });
  /* eslint-enable */
  const newState = Object.assign({}, state, { masterTaxBenifits: taxBenifits });
  return newState;
};

// Get Retiral Benifits by Company and country
const getSwissEmployeeList = (state, action) => {
  const newState = Object.assign({}, state, { payrollEmpList: action.data });
  return newState;
};

// Get emp payslips by start year and end year
const getEmpSwissPayslips = (state, action) => {
  const newState = Object.assign({}, state, { empPayslipList: action.data });
  return newState;
};

// get selected Employee payroll details
const getEmpPayrollDetails = (state, action) => {
  const newState = Object.assign({}, state, { empPayrolldetails: action.data });
  return newState;
};

const removeEmpId = (state, action) => {
  const emplist = Object.assign([], state.payrollEmpList);
  remove(emplist, { id: action.id });

  return Object.assign({}, state, { payrollEmpList: emplist });
};

export default function reducer(state = DEFAULT_STATE, action) {
  let st = state;
  switch (action.type) {
    case PayRoll.GET_MASTER_RETIRALS:
      return getRBByCompany(state, action);
    case PayRoll.POST_MASTER_RETIRALS:
      return postMasterRB(state, action);
    case PayRoll.DELETE_MASTER_RETIRALS:
      return deleteMasterRB(state, action);

    case PayRoll.GET_MASTER_TAX_BENIFIT:
      return getTBByCompany(state, action);
    case PayRoll.POST_MASTER_TAX_BENIFIT:
      return postMasterTB(state, action);
    case PayRoll.DELETE_MASTER_TAX_BENIFIT:
      return deleteMasterTB(state, action);

    case PayRoll.GET_SWISS_EMPLOYEES:
      return getSwissEmployeeList(state, action);
    case PayRoll.PAYROLL_POST_SUCCESS:
      st = {
        ...state,
        swissEmpPayrollPosted: true,
        currentPayrollId: action.data
      };
      break;
    case PayRoll.RESET_PAYROLL_POST_STATUS:
      st = {
        ...state,
        swissEmpPayrollPosted: false,
        currentPayrollId: ''
      };
      break;
    case PayRoll.GET_EMP_PAYROLL:
      st = {
        ...state,
        currentEmpPayroll: action.data
      };
      break;
    case PayRoll.EMPTY_SWISS_EMPLOYEES:
      st = {
        ...state,
        payrollEmpList: []
      };
      break;

    case PayRoll.REMOVE_EMP_FROM_LIST:
      return removeEmpId(state, action);

    case PayRoll.GET_SWISS_EMP_PAYSLIP:
      return getEmpSwissPayslips(state, action);

    case PayRoll.GET_EMP_PAYROLL_DETAIL:
      return getEmpPayrollDetails(state, action);

    default:
      return state;
  }
  return st;
}
