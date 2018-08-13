import { LoginType, ErrorType } from '../actions/ActionType';

const loginTypeObj = {
  menuMappingInfo: {
    employeeId: '',
    employeeRole: '',
    roleId: '',
    screenName: '',
    screenId: '',
    createdDate: ''
  },
  menuMaster: {
    menuName: '',
    menuCode: ''
  },
  roleMaster: {
    roleName: '',
    roleCode: ''
  },
  user: {
    name: '',
    role: '',
    picture: ''
  }
};

const initialState = {
  userInfo: null,
  userInformation: Object.assign({}, loginTypeObj),
  message: null
};

const menuMasterData = (state, action) => {
  // console.log('bugin');
  const newMenuMasterData = {};
  console.log('MenuMaster', action.data);
  Object.assign(newMenuMasterData, state.userInformation);
  newMenuMasterData.menuMaster = action.data;
  const newState = {};
  Object.assign(newState, state, { userInformation: newMenuMasterData });
  console.log('bugin', newMenuMasterData);
  return newState;
};

const usersData = (state, action) => {
  // console.log('bugin');
  const newUsersData = {};
  console.log('MenuMaster', action.data);
  Object.assign(newUsersData, state.userInformation);
  newUsersData.user = action.data;
  const newState = {};
  Object.assign(newState, state, { userInformation: newUsersData });
  console.log('bugin', newUsersData);
  return newState;
};

const menuMappingInfoData = (state, action) => {
  // console.log('bugin');
  const newMenuMappingInfoData = {};
  console.log('MenuMaster', action.data);
  Object.assign(newMenuMappingInfoData, state.userInformation);
  newMenuMappingInfoData.menuMappingInfo = action.data;
  const newState = {};
  Object.assign(newState, state, { userInformation: newMenuMappingInfoData });
  console.log('bugin', newMenuMappingInfoData);
  return newState;
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case LoginType.AUTHENTICATE: {
      st = {
        ...state,
        userInfo: action.userInfo
      };
      break;
    }

    case ErrorType.ERROR_LOG: {
      st = {
        ...state,
        message: action.message
      };
      break;
    }
    case LoginType.GET_MENU_MASTERS_DATA:
      return menuMasterData(state, action);
    case LoginType.GET_USERS_DATA:
      return usersData(state, action);
    case LoginType.GET_MENU_MAPPING_INFO_DATA:
      return menuMappingInfoData(state, action);

    default: {
      return st;
    }
  }
  return st;
}
