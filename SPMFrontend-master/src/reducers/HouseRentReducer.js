import { findIndex, remove } from 'lodash';
import { houseRent } from '../actions/ActionType';

const initialState = {
  message: 'Test Message',
  houseRentArray: [],
  uploadended: false
};

const addNewRent = (state) => {
  const newState = [];
  Object.assign(newState, state.houseRentArray);
  const obj = {
    _id: Math.floor(new Date().valueOf() * Math.random()).toString(),
    rentAmount: '',
    fromDate: '',
    toDate: '',
    document: '',
    addeddocument: '',
    status: 'Pending'
  };
  newState.push(obj);
  const newObj = {};
  Object.assign(newObj, state, { houseRentArray: newState });
  return newObj;
};

const updateRentProperty = (state, action) => {
  const rentArray = Object.assign([], state.houseRentArray);
  const index = findIndex(rentArray, ['_id', action.id]);
  rentArray[index][action.objType] = action.value;
  const newObj = {};
  Object.assign(newObj, state, { houseRentArray: rentArray });
  return newObj;
};

const deletefile = (state, action) => {
  const rentArray = Object.assign([], state.houseRentArray);
  const index = findIndex(rentArray, ['_id', action.id]);
  rentArray[index].document = '';
  const newObj = {};
  Object.assign(newObj, state, { houseRentArray: rentArray });
  return newObj;
};

const deleteHouseRent = (state, action) => {
  /* eslint-disable */
  const rentArray = Object.assign([], state.houseRentArray);
  remove(rentArray, { _id: action.houseRentObj._id });
  /* eslint-enable */
  const newObj = {};
  Object.assign(newObj, state, { houseRentArray: rentArray });
  return newObj;
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case houseRent.GET_HOUSE_RENT: {
      st = {
        ...state,
        houseRentArray: action.houseRent
      };
      break;
    }

    case houseRent.ADD_NEW_RENT:
      return addNewRent(state);

    case houseRent.UPDATE_RENT_PROPERTY:
      return updateRentProperty(state, action);

    case houseRent.DELETE_HOUSE_RENT:
      return deleteHouseRent(state, action);

    case houseRent.FILE_DELETE_SUCCESS:
      return deletefile(state, action);

    case houseRent.UPLOAD_HOUSE_RECIEPTS: {
      st = {
        ...state,
        uploadended: true
      };
      break;
    }
    case houseRent.RESET_HOUSE_UPLOAD_DOCS: {
      st = {
        ...state,
        uploadended: false
      };
      break;
    }

    default: {
      return st;
    }
  }
  return st;
}
