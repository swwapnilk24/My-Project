import axios from 'axios';
import { PayRoll } from './ActionType';
import AppConfig from '../config';

// Get Retral Benifits By Country
export function getRBByCompany(countryName, company) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}retiralbenifits/country/${countryName}/company/${company}`)
    .then((response) => {
      dispatch({ type: PayRoll.GET_MASTER_RETIRALS, data: response.data });
    });
  };
}

// Post Retral Benifits
export function postRetiralBenifit(data) {
  return (dispatch) => {
    axios.post(`${AppConfig.BASE_URL}retiralbenifits`, data)
    .then((response) => {
      dispatch({ type: PayRoll.POST_MASTER_RETIRALS, data: response.data });
    });
  };
}

// delete Retral Benifits
export function deleteRetiralBenifit(id) {
  return (dispatch) => {
    axios.delete(`${AppConfig.BASE_URL}retiralbenifits/${id}`)
    .then(() => {
      dispatch({ type: PayRoll.DELETE_MASTER_RETIRALS, id });
    });
  };
}

// Get Tax Benifits By Country
export function getTBByCompany(countryName, company) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}taxbenifit/country/${countryName}/company/${company}`)
    .then((response) => {
      dispatch({ type: PayRoll.GET_MASTER_TAX_BENIFIT, data: response.data });
    });
  };
}

export function postTaxBenifit(data) {
  return (dispatch) => {
    axios.post(`${AppConfig.BASE_URL}taxbenifit`, data)
    .then((response) => {
      dispatch({ type: PayRoll.POST_MASTER_TAX_BENIFIT, data: response.data });
    });
  };
}

export function deleteTaxBenifit(id) {
  return (dispatch) => {
    axios.delete(`${AppConfig.BASE_URL}taxbenifit/${id}`)
    .then(() => {
      dispatch({ type: PayRoll.DELETE_MASTER_TAX_BENIFIT, id });
    });
  };
}

export function getSwissEmployeeList(company, year, month) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}swisspayroll/emplist/company/${company}/${year}/${month}`)
    .then((response) => {
      dispatch({ type: PayRoll.GET_SWISS_EMPLOYEES, data: response.data });
    });
  };
}

export function getSwissProcessedEmpLt(company, year, month) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}swisspayroll/company/${company}/${year}/${month}`)
    .then((response) => {
      dispatch({ type: PayRoll.GET_SWISS_EMPLOYEES, data: response.data });
    });
  };
}

export function postEmpSwissPayroll(id, data) {
  const obj = { id, payroll: data };
  return (dispatch) => {
    axios.post(`${AppConfig.BASE_URL}swisspayroll/generateemppayroll`, obj)
    .then((response) => {
      dispatch({ type: PayRoll.PAYROLL_POST_SUCCESS, data: response.data });
    });
  };
}

export function updateEmpSwissPayroll(id, payrollId, data) {
  const obj = { id, payrollId, payroll: data };
  return (dispatch) => {
    axios.post(`${AppConfig.BASE_URL}swisspayroll/updateemppayroll`, obj)
    .then((response) => {
      dispatch({ type: PayRoll.PAYROLL_POST_SUCCESS, data: response.data });
    });
  };
}

export function resetPayrollPostStatus() {
  return {
    type: PayRoll.RESET_PAYROLL_POST_STATUS
  };
}
export function emptyEmplist() {
  return {
    type: PayRoll.EMPTY_SWISS_EMPLOYEES
  };
}

export function removeEmpId(id) {
  return {
    type: PayRoll.REMOVE_EMP_FROM_LIST,
    id
  };
}

export function getEmpPRbyMonth(id, year, month) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}swisspayroll/employeepayroll/${id}/${year}/${month}`)
    .then((response) => {
      dispatch({ type: PayRoll.GET_EMP_PAYROLL, data: response.data });
    });
  };
}

export function getSwissEmpPayslips(empid, startyear, endyear) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}swisspayroll/emppayslip/${empid}/${startyear}/${endyear}`)
    .then((response) => {
      dispatch({ type: PayRoll.GET_SWISS_EMP_PAYSLIP, data: response.data });
    });
  };
}

export function getEmpPayrollDetails(id) {
  return (dispatch) => {
    axios.get(`${AppConfig.BASE_URL}employees/getEmpSalDtls/${id}`)
    .then((response) => {
      dispatch({ type: PayRoll.GET_EMP_PAYROLL_DETAIL, data: response.data });
    });
  };
}
