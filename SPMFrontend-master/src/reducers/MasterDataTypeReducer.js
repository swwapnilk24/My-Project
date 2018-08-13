// import _ from 'lodash';
import { MasterDataType, ErrorType } from '../actions/ActionType';

const initialState = {
  masterDataTypes: [],
  message: null
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case MasterDataType.CREATE_MASTER_DATA_TYPE: {
      st = {
        ...state,
        masterDataTypes: action.masterDataTypes
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
    default: {
      return st;
    }
  }
  return st;
}
