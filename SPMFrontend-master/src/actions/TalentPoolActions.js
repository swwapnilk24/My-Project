import axios from 'axios';
import { EmployeeType, ErrorType } from './ActionType';
import config from '../config';
// import { server } from './config';

export function approveSkills(employeeData) {
  return function (dispatch) {
    // const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    // const LOGINCONFIG = Configs.LOGINCONFIG;
    axios
      .post(`${config.BASE_URL}employees/approveSkills`, employeeData)
      .then(response => {
        console.log(response);
        dispatch({
          type: EmployeeType.SKILLS_APPROVE,
          skillsInfo: employeeData
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

