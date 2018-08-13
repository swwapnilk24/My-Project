import { LeaveMasterType } from '../actions/ActionType';


const initialState = {
  leavesMasterData: [],
  currentData: {},
  listLeaveAvailedData: [],
  leavesIndividual: []
  // currentData: {
  //   _id: '',
  //   country: '',
  //   role: '',
  //   timeOffType: '',
  //   numberOfDays: '',
  //   yearStartDate: new Date(),
  //   yearEndDate: new Date(),
  //   status: ''
  // }
};

const setLeavesMasterData = (state, action) => {
  const newState = { ...state };
  console.log(newState);
  if (action.data.type === 'add') {
    newState.leavesMasterData.push(action.data.newData);
    newState.currentData = action.data.newData;
  }
  if (action.data.type === 'edit') {
    newState.currentData = action.data.newData;
  }
  const finalState = { ...newState };
  console.log(finalState, 'finalState');
  return finalState;
};

const updateLeavesMasterData = (state, action) => {
  console.log('action.data', action.data);
  let newLeavesMasterState = [...state.leavesMasterData];
  newLeavesMasterState = action.data.map(data => data.leavesMasterData);
  console.log(newLeavesMasterState, 'newLeavesMasterState');
  const finalState = { ...state, leavesMasterData: newLeavesMasterState };
  return finalState;
};

const getLeavesAvailedByEmployees = (state, action) => {
  const newAvailedState = { ...state, listLeaveAvailedData: action.data };
  console.log('newAvailedState', newAvailedState);
  return newAvailedState;
  // st = { ...state, listProdSupportData: action.data };
};

const setProcessedStatus = (state, action) => {
  console.log(action.data);
  const newLeavesMasterState = [...state.leavesMasterData];
  const id = '_id';
  console.log(action.data.leavesMasterData[id]);
  const newArray = newLeavesMasterState.map(data => {
    console.log(data);
    if (data[id] === action.data.leavesMasterData[id]) {
      const newData = data;
      newData.status = 'Processed';
      return newData;
    }
    return data;
  });
  console.log(newArray);
  const finalState = { ...state, leavesMasterData: newArray };
  return finalState;
};

const setLeavesIndividual = (state, action) => {
  // console.log(action.data);
  const newLeavesIndividual = [...state.leavesIndividual];
  newLeavesIndividual.push(action.data.leavesIndividual);
  const finalState = { ...state, leavesIndividual: newLeavesIndividual };
  return finalState;
};

const updateLeavesIndividual = (state, action) => {
  let newLeavesIndividual = [...state.leavesIndividual];
  newLeavesIndividual = action.data.map(data => data.leavesIndividual);
  const finalState = { ...state, leavesIndividual: newLeavesIndividual };
  return finalState;
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LeaveMasterType.SET_LEAVES_MASTER_DATA:
      return setLeavesMasterData(state, action);

    case LeaveMasterType.GET_LEAVES_MASTER_DATA:
      return updateLeavesMasterData(state, action);

    case LeaveMasterType.SET_PROCESSED_STATUS:
      return setProcessedStatus(state, action);
    case LeaveMasterType.GET_LEAVES_BY_SEL_MONTH:
      return getLeavesAvailedByEmployees(state, action);

    case LeaveMasterType.SET_LEAVES_INDIVIDUAL:
      return setLeavesIndividual(state, action);

    case LeaveMasterType.GET_LEAVES_INDIVIDUAL:
      return updateLeavesIndividual(state, action);

    default:
      return state;
  }
}
