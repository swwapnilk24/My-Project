import { AdminHealthInsurancePlans } from '../actions/ActionType';

const initialState = {
  Data: {
    company_id: '',
    healthInsurancePlans: []
  }
};
const updateLocalState = (state, action) => {
  let Data = Object.assign({}, state.Data);
  Data = action.data;
  console.log('health data', action.data);
  const newHealthInsBen = Object.assign({}, state, { Data });
  return newHealthInsBen;
};

const addEntry = (state, action) => {
  const healthInsuranceBenefitsNew = Object.assign([], state.Data.healthInsurancePlans);
  healthInsuranceBenefitsNew.push(action.data);
  const newHealthInsBen = Object.assign({}, state.Data, { healthInsurancePlans: healthInsuranceBenefitsNew });
  const newState = Object.assign({}, state, { Data: newHealthInsBen });
  return newState;
};

const deleteEntry = (state, action) => {
  const healthInsuranceBenefitsNew = Object.assign([], state.Data.healthInsurancePlans);
  const newArrayWithoutDelElement = [];
  const key = '_id';
  healthInsuranceBenefitsNew.map((data) => {
    if (data[key] !== action.data[key]) {
      newArrayWithoutDelElement.push(data);
    }
    return null;
  });
  const newHealthInsBen = Object.assign({}, state.Data, { healthInsurancePlans: newArrayWithoutDelElement });
  const newState = Object.assign({}, state, { Data: newHealthInsBen });
  return newState;
};

export default function adminHealthInsuranceReducer(state = initialState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case AdminHealthInsurancePlans.ADD_ENTRY_PLAN:
      st = addEntry(st, action);
      break;
    case AdminHealthInsurancePlans.FETCH_FROM_DB_FOR_ADMIN_HEALTH_INSURANCE_BENEFITS_PLAN:
      st = updateLocalState(st, action);
      break;
    case AdminHealthInsurancePlans.DELETE_ENTRY_PLAN:
      st = deleteEntry(st, action);
      break;
    default: {
      return st;
    }
  }
  return st;
}
