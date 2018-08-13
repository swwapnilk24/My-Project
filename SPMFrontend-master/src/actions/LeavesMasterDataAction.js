import axios from 'axios';
import { LeaveMasterType, ErrorType } from './ActionType';
import { LeavesCalcURL } from './ActionURL';
import { Configs } from './ActionConfigs';

export function setLeavesMasterData(data) {
  return {
    type: LeaveMasterType.SET_LEAVES_MASTER_DATA,
    data
  };
}

export function updateLeavesData(data) {
  return {
    type: LeaveMasterType.GET_LEAVES_MASTER_DATA,
    data
  };
}

export function setProcessedStatus(data) {
  return {
    type: LeaveMasterType.SET_PROCESSED_STATUS,
    data
  };
}

// export function getLeaveCalcData(selDate) {
//   const selDateUrl = `${LeavesCalcURL.LEAVES_PAYROLL_URL}${selDate}`;
//   console.log('welcome to get employees', selDateUrl);
// }
export function setLeavesIndividual(data) {
  return {
    type: LeaveMasterType.SET_LEAVES_INDIVIDUAL,
    data
  };
}

export function updateIndividualLeaves(data) {
  return {
    type: LeaveMasterType.GET_LEAVES_INDIVIDUAL,
    data
  };
}

export function getLeaveCalcData(selDate) {
  console.log('welcome to get employees', LeavesCalcURL.LEAVES_PAYROLL_URL);
  const selDateUrl = `${LeavesCalcURL.LEAVES_PAYROLL_URL}${selDate}`;
  return function (dispatch) {
    axios
     .get(selDateUrl, Configs.ORG_CHART_CONFIG)
     .then(res => {
       console.log('welcome to get employees', res.data);
       dispatch({ type: LeaveMasterType.GET_LEAVES_BY_SEL_MONTH, data: res.data });
     })
     .catch(err => {
       dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
     });
  };
}
