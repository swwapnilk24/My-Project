import axios from 'axios';
import { server } from './config';
import { PerformanceManagementType } from '../actions/ActionType';

export function getPerformanceManagementData(dispatch) {
  axios({
    method: 'get',
    url: `${server}/performanceManagement`
  }).then(response => {
    console.log(response.data);
    dispatch({ type: PerformanceManagementType.GET_PERFORMANCE_MANAGEMENT_DATA, data: response.data });
  });
}
export function upPerformanceManagementData(info, shouldUpdate, dispatch) {
  console.log(info);
  axios({
    method: 'post',
    url: `${server}/performanceManagement`,
    data: info
  }).then(response => {
    console.log('hello', response.data);
    dispatch({ type: PerformanceManagementType.UPDATE_PERFORMANCE_MANAGEMENT_DATA, data: response.data });
  }).catch(error => {
    console.log(error);
  });
}

