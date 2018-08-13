import { DashboardType } from '../actions/ActionType';

const initialState = {
  message: 'Test Message'
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case DashboardType.GET_ABOUTINFO: {
      st = {
        ...state,
        message: action.message
      };
      break;
    }

    case DashboardType.ERROR_LOG: {
      st = {
        ...state,
        message: 'Error.'
      };
      break;
    }

    default: {
      return st;
    }
  }
  return st;
}
