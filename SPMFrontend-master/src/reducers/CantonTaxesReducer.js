import { CantonTaxes } from '../actions/ActionType';

const initialState = {
  cantonTaxes: [],
  cantonTaxesAll: []
};

const fetchFromDB = (state, action) => {
  let newState = Object.assign([], state.cantonTaxes);
  newState = action.data;
  const finalState = Object.assign({}, state, { cantonTaxes: newState });
  return finalState;
};

const fetchForAll = (state, action) => {
  let newState = Object.assign([], state.cantonTaxesAll);
  newState = action.data;
  const finalState = Object.assign({}, state, { cantonTaxesAll: newState });
  return finalState;
};

const updateCantonTaxes = (state, action) => {
  const newState = Object.assign([], state.cantonTaxes);
  const newStateAll = Object.assign([], state.cantonTaxesAll);
  console.log('checking undefined err', newState, newStateAll);
  newState[0].masterDataType.names.push(action.data);
  newStateAll[0].masterDataType.names.push(action.data);
  const finalState = Object.assign({}, state, { cantonTaxes: newState }, { cantonTaxesAll: newStateAll });
  return finalState;
};

export default function reducer(state = initialState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case CantonTaxes.FETCH_FROM_DB:
      st = fetchFromDB(st, action);
      break;
    case CantonTaxes.UPDATE_CONTON_TAXES:
      st = updateCantonTaxes(st, action);
      break;
    case CantonTaxes.FETCH_FOR_ALL:
      st = fetchForAll(st, action);
      break;
    default: {
      return st;
    }
  }
  return st;
}
