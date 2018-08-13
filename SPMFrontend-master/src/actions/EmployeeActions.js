// import axios from 'axios';
// import { EmployeeType, AddressType, CurrentEmployeeType, LoginType } from './ActionType';
import axios from 'axios';
import { EmployeeUrl } from './ActionURL';
import { Configs } from './ActionConfigs';
import AppConfig from '../config';
import { EmployeeType, AddressType, CurrentEmployeeType, ErrorType, LoginType } from './ActionType';
// import config from '../config';

/* const HEADER_CONFIG = {
 headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' }
 }; */
export function getWorkers(test) {
  console.log(test);
  return function (dispatch) {
    const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    const LOGINCONFIG = Configs.LOGINCONFIG;
    axios
      .get(EmployeeUrl.EmployeeUrl, JSON.stringify(accessToken), LOGINCONFIG)
      .then(response => {
        console.log(response);
        dispatch({
          type: EmployeeType.GET_ALL_EMPLOYEE,
          data: response.data
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return { type: EmployeeType.GET_ALL_EMPLOYEE, data: test };
}
export function getCurrentWorker(id) {
  return { type: EmployeeType.GET_CURRENT_WORKER, id };
}
export function modifyHireDate(date) {
  console.log('modifyHireDate');
  return { type: EmployeeType.MODIFY_HIRE_DATE, date };
}
export function getCurrentEmployee() {
  return { type: EmployeeType.GET_CURRENT_EMPLOYEE };
}
export function updateCompany(data) {
  return { type: EmployeeType.UPDATE_COMPANY_DATA, data };
}
export function updateEventReason(id) {
  return { type: EmployeeType.UPDATE_EVENT_REASON_DATA, id };
}
export function modifyDOB(date) {
  return { type: EmployeeType.MODIFY_DOB, date };
}
export function updateCountryOfBirth(id) {
  return { type: EmployeeType.UPDATE_COUNTRY_OF_BIRTH, id };
}
export function modifyDateOfDeath(date) {
  return { type: EmployeeType.MODIFY_DATEOFDEATH, date };
}
export function modifyCertificateStartDate(date) {
  return { type: EmployeeType.MODIFY_CERTIFICATE_START_DATE, date };
}
export function modifyCertificateEndDate(date) {
  return { type: EmployeeType.MODIFY_CERTIFICATE_END_DATE, date };
}

export function updateEmployeeData(data) {
  return { type: EmployeeType.UPDATE_EMPLOYEE_DATA, data };
}

export function setNewEmployee(data) {
  return { type: EmployeeType.SET_NEW_EMPLOYEE, data };
}

export function updateAddressData(data) {
  return { type: AddressType.UPDATE_ADDRESS_DATA, data };
}

export function totalAddressInGridonLoad(data) {
  console.log(data);
  return { type: AddressType.TOTAL_ADDRESS_IN_GRID_ONLOAD, data };
}

export function addressInGridEdited(data) {
  console.log(data);
  return { type: AddressType.ADDRESS_IN_GRID_EDITED, data };
}

export function addedNewAddress(data) {
  console.log(data);
  return { type: AddressType.ADDED_NEW_ADDRESS, data };
}

export function setCurrentEmployee(data) {
  console.log('Set Employee Dta ', data);
  return { type: EmployeeType.SET_CURRENT_EMPLOYEE, data };
}

// export function updateJobInfo(data) {
//   return { type: CurrentEmployeeType.UPDATE_JOB_INFO_DATA, data };
// }

export function updateCompensationData(data) {
  return { type: CurrentEmployeeType.UPDATE_COMPENSATION_DATA, data };
}

export function updatePersonalInformationData(data) {
  return { type: CurrentEmployeeType.UPDATE_PERSONAL_INFO_DATA, data };
}

export function updateJobInfoData(data) {
  return { type: CurrentEmployeeType.UPDATE_JOB_INFO, data };
}

export function createNewEmployee(data) {
  return { type: EmployeeType.CREATE_NEW_EMPLOYEE, data };
}

export function getLastEmployeeId(data) {
  return { type: EmployeeType.GET_LAST_EMPLOYEE_ID, data };
}

export function addNationalIdInformationData(data) {
  return { type: EmployeeType.ADD_NATIONALID_DATA, data };
}

export function getListOfMyEmployeesData(data) {
  return { type: EmployeeType.LIST_MYEMPLOYEES, data };
}

export function searchEmployeeById(data) {
  return { type: EmployeeType.SEARCH_EMPLOYEE_ID, data };
}

export function addEmailIdInformationData(data) {
  return { type: EmployeeType.ADD_EMAILID_DATA, data };
}

export function addPhoneInformationData(data) {
  return { type: EmployeeType.ADD_PHONE_INFO_DATA, data };
}

export function addWorkPermitInfoData(data) {
  return { type: EmployeeType.ADD_WORKPERMIT_INFO_DATA, data };
}

export function addAddressInfoData(data) {
  return { type: EmployeeType.ADD_ADDRESS_INFO_DATA, data };
}
export function modifyEventReason(data) {
  return { type: EmployeeType.MODIFY_EVENT_REASON, data };
}
export function addFieldsForArray(data) {
  return { type: EmployeeType.ADD_FIELDS_FOR_ARRAY, data };
}
export function getBenefitsData(data) {
  return { type: EmployeeType.GET_BENEFITS_DATA, data };
}
export function updateBenefitsData(data) {
  return { type: CurrentEmployeeType.UPDATE_BENEFITS_DATA, data };
}
export function approveBenefitEnrollment(data) {
  return { type: CurrentEmployeeType.APPROVE_BENEFITS_ENROLLMENT, data };
}
export function emptyNewEmployee(data) {
  return { type: EmployeeType.EMPTY_NEW_EMPLOYEE, data };
}
export function getListofMyTempEmployees(data) {
  return { type: EmployeeType.TEMP_LIST_MYEMPLOYEES, data };
}
export function updateNewEmployee(data) {
  return { type: EmployeeType.UPDATE_NEW_EMPLOYEE, data };
}
export function getLastTempEmployeeId(data) {
  return { type: EmployeeType.GET_LAST_TEMP_EMPLOYEE_ID, data };
}
export function cancelBenefitsData(data) {
  console.log('action data cancel benefirs');
  return { type: CurrentEmployeeType.CANCEL_CURRENT_BENEFITS_ALLOWANCE, data };
}
export function updateTimeOff(data) {
  return { type: CurrentEmployeeType.UPDATE_TIME_OFF, data };
}
export function menuMasterData(data) {
  return { type: LoginType.GET_MENU_MASTERS_DATA, data };
}
export function usersData(data) {
  return { type: LoginType.GET_USERS_DATA, data };
}
export function menuMappingInfoData(data) {
  return { type: LoginType.GET_MENU_MAPPING_INFO_DATA, data };
}

export function approveorRejectTimeOff(data) {
  return { type: CurrentEmployeeType.APPROVE_REJECT_TIME_OFF, data };
}
export function updateTimeOffComments(data) {
  return { type: CurrentEmployeeType.UPDATE_TIME_OFF_COMMENTS, data };
}
export function updateNewEmployeeCompensation(data) {
  return { type: EmployeeType.UPDATE_NEW_EMPLOYEE_COMPENSATION, data };
}
