import axios from 'axios';
import { AddNewPositionType, ErrorType } from './ActionType';
import config from '../config';
// import { server } from './config';

export function checkPotential() {
  return {
    type: AddNewPositionType.CHECKED_POTENTIAL
  };
}
export function updateEmployeePosition(data) {
  return { type: AddNewPositionType.UPDATE_POSITION_DATA, data };
}

export function postEmployeePosition(employeeData) {
  const employeePositionObject = {
    id: '5a6608e3a9247b122755d29a',
    empid: 101,
    skillInformation: {
      skillName: employeeData.newPosition.position,
      potential: employeeData.newPosition.potential,
      notes: employeeData.newPosition.notes,
      country: {
        id: employeeData.newPosition.country,
        name: employeeData.newPosition.country.name
      },
      readiness: {
        id: employeeData.newPosition.readiness,
        name: employeeData.newPosition.readiness.name
      },
      proposedBy: 'royal',
      proposedOn: employeeData.newPosition.proposedOn
    }
  };
  return function (dispatch) {
    // const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    // const LOGINCONFIG = Configs.LOGINCONFIG;
    axios
      .post(`${config.BASE_URL}employees/skills`, employeePositionObject)
      .then(response => {
        console.log(response);
        dispatch({
          type: AddNewPositionType.POSITION_SAVE_DATA,
          skillsInfo: employeePositionObject
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
  // return (dispatch) => {
  //   dispatch({
  //     type: AddNewSkillsType.SKILLS_SAVE_DATA,
  //     skillsInfo: data
  //   });
  // };
}

