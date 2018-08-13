// import { filter } from 'lodash';
import { AddNewPositionType } from '../actions/ActionType';

const currentEmployeeObj = {
  newPosition: {
    position: '',
    potential: false,
    country: '',
    readiness: '',
    notes: '',
    proposedOn: new Date(),
    proposedBy: ''
  }
};

const DEFAULT_STATE = {
  positionInfo: {},
  isSavedSkilles: false,
  skillsMessage: '',
  // newEmployee: intialState(),
  currentEmployee: Object.assign({}, currentEmployeeObj)

};

const setCheck = (state) => {
  const newCurrentEmployeepotential = {};
  Object.assign(newCurrentEmployeepotential, state.currentEmployee);
  // console.log(action.data, 'action checked');
  // newCurrentEmployeepotential.newPosition.potential = action.data;
  newCurrentEmployeepotential.newPosition.potential = !newCurrentEmployeepotential.newPosition.potential;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeepotential });
  return newState;
};
const updateData = (state, action) => {
  console.log(state, 'stateprint');
  console.log(action.data.value, 'adding new');
  const newCurrentEmployeeState = {};
  Object.assign(newCurrentEmployeeState, state.currentEmployee);
  newCurrentEmployeeState.newPosition[action.data.field] = action.data.value;
  const newState = {};
  Object.assign(newState, state, { currentEmployee: newCurrentEmployeeState });
  return newState;
};

const setPosition = (state, action) => {
  const newState = [];
  Object.assign(newState, state);

  if (action.positionInfo.message) {
    newState.positionInfo = {};
    newState.isSavedSkilles = false;
    newState.skillsMessage = action.positionInfo.message;
  } else {
    newState.positionInfo = action.positionInfo;
    newState.isSavedSkilles = true;
    newState.skillsMessage = '';
  }
  return newState;
};

export default function reducer(state = DEFAULT_STATE, action) {
  console.log('IS IN REDUCER ');
  switch (action.type) {
    case AddNewPositionType.UPDATE_POSITION_DATA:
      return updateData(state, action);

    case AddNewPositionType.POSITION_SAVE_DATA:
      return setPosition(state, action);

    case AddNewPositionType.CHECKED_POTENTIAL:
      return setCheck(state, action);

    default:
      return state;
  }
}
