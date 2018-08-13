import { RolesApprovalType } from '../actions/ActionType';

const rolesApprovalTypeObj = {
  rolesApproval: []
};

const initialState = {
  rolesApprovalInfo: Object.assign({}, rolesApprovalTypeObj)
};

const RolesApprovalData = (state, action) => {
  console.log('MenuMaster', action.data);
  const newState = {};
  Object.assign(newState, state, { rolesApprovalInfo: action.data[0] });
  console.log('bugin', newState);
  return newState;
};

const updateRolesApprovalData = (state, action) => {
  console.log(state, action.data);
  let newRolesApprovalData = {};
  Object.assign(newRolesApprovalData, state.rolesApprovalInfo);
  const value = [];
  action.data.value.map((values, index) => {
    console.log(values);
    value.push(values);
    newRolesApprovalData = values;
    console.log(newRolesApprovalData);
    return index;
  });
  console.log(value);
  const newState = {};
  Object.assign(newState, state, { rolesApprovalInfo: value });
  console.log(newState);
  return newState;
};

export default function reducer(state = initialState, action) {
  // const st = state;
  switch (action.type) {
    case RolesApprovalType.GET_ROLES_APPROVAL:
      return RolesApprovalData(state, action);
    case RolesApprovalType.UPDATE_ROLES_APPROVAL_DATA:
      return updateRolesApprovalData(state, action);
    default:
      return state;
  }
}
