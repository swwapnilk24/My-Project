import { Registration } from '../actions/ActionType';

const initialState = {
  addUserData: [],
  listOfEmployees: []
};
const saveUserData = (state, action) => {
  console.log('Reducer', action.data);
  const oldState = Object.assign([], state.addUserData);
  oldState.push(action.data);
  const newState = Object.assign({}, state, { addUserData: oldState });
  return newState;
};

export default function reducer(state = initialState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case Registration.ADD_REGISTRATION:
      st = saveUserData(st, action);
      break;
    case Registration.ADD_USER: {
      console.log('action.data', action.data);
      st = saveUserData(st, action);
      // st = { ...state, addUserData: action.data };
      break;
    }
    case Registration.GET_LOGIN_DETAILS: {
      st = { ...state, listOfEmployees: action.data };
      break;
    }
    default: {
      return st;
    }
  }
  return st;
}
