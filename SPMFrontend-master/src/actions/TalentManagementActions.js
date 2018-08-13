import axios from 'axios';
import { EmployeeUrl } from './ActionURL';
import { Configs } from './ActionConfigs';
import AppConfig from '../config';
import { TalentManagementType, ErrorType } from './ActionType';
// import { TalentManagementType } from './ActionType';
import menuSubmenuList from './../../config/test.json';
// import employeeList from './../../config/employee.json';

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
          type: TalentManagementType.GET_ALL_EMPLOYEE,
          data: response.data
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return {
  //   type: TalentManagementType.GET_ALL_EMPLOYEE,
  //   data: employeeList
  // };
}
export function getMenuSubmenu() {
    //   return function (dispatch) {
    //     const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    //     const LOGINCONFIG = Configs.LOGINCONFIG;
    //     axios
    //       .get(EmployeeUrl.EmployeeUrl, JSON.stringify(accessToken), LOGINCONFIG)
    //       .then(response => {
    //         console.log(response);
    //         dispatch({
    //           type: TalentManagementType.GET_ALL_EMPLOYEE,
    //           data: response.data
    //         });
    //       })
    //       .catch(err => {
    //         dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
    //       });
    //   };
  return {
    type: TalentManagementType.GET_MENU_SUBMENU,
    data: menuSubmenuList
  };
}
export function getFilteredWorker(key1, value1, mid, sid) {
  return {
    type: TalentManagementType.GET_FILTERED_WORKERS,
    key: key1,
    value: value1,
    menuId: mid,
    subMenuId: sid
  };
}
export function getUncheckedFilteredWorker(key1, value1) {
  return {
    type: TalentManagementType.GET_UNCHECKED_FILTERED_WORKERS,
    key: key1,
    value: value1
  };
}
