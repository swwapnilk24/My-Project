import { findIndex } from 'lodash';
import { TalentPoolType } from '../actions/ActionType';

const DEFAULT_STATE = {
  myEmployees: []
};

const skillApprove = (state, action) => {
  console.log(state, 'state');
  const newMyEmployees = [];
  const myFilteredWorkers = state.employee.myEmployees;
  for (let k = 0; k < myFilteredWorkers.length; k += 1) {
    const currentEmployee = myFilteredWorkers[k];
    const id = '_id';
    const indexMenu = findIndex(action.data, ['empObjectId', currentEmployee[id]]);
    if (indexMenu > -1) {
      const skillInformationArray = myFilteredWorkers[k].skillInformation;
      for (let i = 0; i < skillInformationArray.length; i += 1) {
        const skillInformation = skillInformationArray[i];
        const indexSubMenu = findIndex(action.data, ['skillObjectId', skillInformation[id]]);
        if (indexSubMenu > -1) {
          skillInformation.status = 'Approved';
          currentEmployee.skillInformation = skillInformation;
        }
      }
    }
    newMyEmployees.push(currentEmployee);
  }
  const newState = {};
  Object.assign(newState, state);
  newState.employee.myEmployees = newMyEmployees;
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  console.log('IS IN REDUCER ');
  switch (action.type) {
    case TalentPoolType.SKILLS_APPROVE:
      return skillApprove(state, action);
    default:
      return state;
  }
}
