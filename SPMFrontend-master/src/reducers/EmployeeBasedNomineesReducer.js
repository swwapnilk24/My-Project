import { EmployeeBasedNominees } from '../actions/ActionType';

// function getInitialState() {
//   return initialState;
// }
const initialState = {
  NomineesData: [],
  NomineesAuditData: []
};

function fetchDataAndAuditFromDB(state, action) {
  let newState = {};
  Object.assign(newState, state.NomineesData);
  newState = action.data.nominees;
  const completeState = Object.assign({}, state, { NomineesData: newState });
  return completeState;
}

function updateNominees(state, action) {
  const newState = {};
  Object.assign(newState, state.NomineesData);
  newState.nominees.push(action.data);
  const completeState = Object.assign({}, state, { NomineesData: newState });
  return completeState;
}

function deleteNominee(state, action) {
  const newState = [];
  Object.assign(newState, state.NomineesData);
  const key = '_id';
  const newDelArray = [];
  newState.map((data, index) => {
    if (data[key] !== action.data) {
      newDelArray.push(data);
    }
    return index;
  });
  const completeState = Object.assign({}, state, { NomineesData: newDelArray });
  return completeState;
}

export default function employeeBasedNominnesReducer(state = initialState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case EmployeeBasedNominees.FETCH_FROM_DB:
      st = fetchDataAndAuditFromDB(st, action);
      break;
    case EmployeeBasedNominees.UPDATE_NOMINEES:
      st = updateNominees(st, action);
      break;
    case EmployeeBasedNominees.DELETE_NOMINEE:
      st = deleteNominee(st, action);
      break;
    default: {
      return st;
    }
  }
  return st;
}
