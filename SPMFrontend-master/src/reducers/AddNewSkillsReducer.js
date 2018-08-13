// import { filter } from 'lodash';
import { AddNewSkillsType } from '../actions/ActionType';

const currentEmployeeObj = {
  newSkills: {
    fromDate: '',
    level: '',
    skillsAqquired: '',
    toDate: ''
  }
};

const DEFAULT_STATE = {
  skillsInfo: {},
  isSavedSkilles: false,
  skillsMessage: '',
  // newEmployee: intialState(),
  currentEmployee: Object.assign({}, currentEmployeeObj)

};


const updateData = (state, action) => {
  console.log(state, 'stateprint');
  console.log(action.data.value, 'adding new');
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  newCurrentEmployeeState.newSkills[action.data.field] = action.data.value;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  console.log('IS IN REDUCER ');
  switch (action.type) {
    case AddNewSkillsType.UPDATE_SKILLS_DATA:
      return updateData(state, action);

    default:
      return state;
  }
}
