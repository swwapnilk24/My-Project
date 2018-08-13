import { RoleType } from '../actions/ActionType';

const initialState = {
  roles: [{
    roleName: '',
    roleCode: ''
  }]
};

const setRoleTypes = (state, action) => {
  console.log(state, action);
  let newRolesState = { ...state.roles };
  newRolesState = action.data;
  const finalState = { ...state, roles: newRolesState };
  return finalState;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case RoleType.GET_ROLES:
      return setRoleTypes(state, action);

    default:
      return state;
  }
}
