import { HRQueries } from '../actions/ActionType';

const initialState = {
  listHRQueriesData: []
};

const saveHRQueriesData = (state, action) => {
  console.log('Reducer', action.data);
  const oldState = Object.assign([], state.listHRQueriesData);
  oldState.push(action.data);
  const newState = Object.assign({}, state, { listHRQueriesData: oldState });
  return newState;
};

export default function reducer(state = initialState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case HRQueries.ADD_HR_QUERIES:
      st = saveHRQueriesData(st, action);
      break;
    case HRQueries.GET_HR_QUERIES: {
      console.log('action.datarhrqueries', action.data);
      st = { ...state, listHRQueriesData: action.data };
      break;
    }
    default: {
      return st;
    }
  }
  return st;
}
