import { ProdSupport } from '../actions/ActionType';

const initialState = {
  prodSupportData: [],
  listProdSupportData: []
};

const saveProdSupportData = (state, action) => {
  console.log('Reducer', action.data);
  const oldState = Object.assign([], state.listProdSupportData);
  oldState.push(action.data);
  const newState = Object.assign({}, state, { listProdSupportData: oldState });
  return newState;
};

// const getProdSupportData = (state, action) => {
//   console.log('Reducer', action.data);
// };

export default function reducer(state = initialState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case ProdSupport.ADD_PROD_SUPPORT:
      st = saveProdSupportData(st, action);
      break;
    case ProdSupport.GET_PROD_SUPPORT: {
      console.log('action.data', action.data);
      st = { ...state, listProdSupportData: action.data };
      break;
    }
    default: {
      return st;
    }
  }
  return st;
}
