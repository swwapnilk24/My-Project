import axios from 'axios';
import { EmployeeType, AddNewSkillsType, ErrorType } from './ActionType';
import config from '../config';
// import { server } from './config';

export function postEmployeeSkills(employeeData) {
  const employeeSkillObject = {
    id: '5a55cf5e84f73ce507d784cb',
    empid: 101,
    skillInformation: {
      skillName: employeeData.newSkills.skillsAqquired,
      fromDate: employeeData.newSkills.fromDate,
      toDate: employeeData.newSkills.toDate,
      level: {
        id: employeeData.newSkills.level,
        name: employeeData.newSkills.level
      }
    }
  };
  return function (dispatch) {
    // const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    // const LOGINCONFIG = Configs.LOGINCONFIG;
    axios
      .post(`${config.BASE_URL}employees/skills`, employeeSkillObject)
      .then(response => {
        console.log(response);
        dispatch({
          type: EmployeeType.SKILLS_SAVE_DATA,
          skillsInfo: employeeSkillObject
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

export function updateSkills(data) {
  return { type: AddNewSkillsType.UPDATE_SKILLS_DATA, data };
}
