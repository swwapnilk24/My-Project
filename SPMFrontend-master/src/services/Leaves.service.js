import axios from 'axios';
import { server } from './config';
import { updateLeavesData, updateIndividualLeaves } from '../actions/LeavesMasterDataAction';

export function updateLeavesMasterData(leavesData, dispatch) {
  // console.log('making a service call', leavesData);
  console.log('server in leavesMaster', `${server}/leavesMaster`);
  axios.post(`${server}/leavesMaster`, leavesData)
    .then(res => {
      console.log('After adding leaves master data: ', res.data);
      dispatch(updateLeavesData(res.data));
    })
    .catch(error => {
      console.log(error);
    });
}

export function getLeavesMasterData(dispatch) {
  console.log('server in leavesMaster', `${server}/leavesMaster`);
  axios.get(`${server}/leavesMaster`)
    .then(res => {
      console.log('After adding leaves master data: ', res.data);
      dispatch(updateLeavesData(res.data));
    })
    .catch(error => {
      console.log(error);
    });
}

export function getIndividualLeaves(dispatch) {
  axios.get(`${server}/leavesIndividual`)
    .then(res => {
      console.log('After adding leaves individual data: ', res.data);
      dispatch(updateIndividualLeaves(res.data));
    })
    .catch(error => {
      console.log(error);
    });
}
