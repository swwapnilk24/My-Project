import axios from 'axios';
import { server } from './config';
import { RolesApprovalType } from '../actions/ActionType';

export function getRolesApprovalData(dispatch) {
  axios({
    method: 'get',
    url: `${server}/rolesapproval`
  }).then(response => {
    console.log(response.data);
    dispatch({ type: RolesApprovalType.GET_ROLES_APPROVAL, data: response.data });
  });
}

export function upRolesApprovalData(info, shouldUpdate, dispatch) {
  console.log(info);
  axios({
    method: 'post',
    url: `${server}/rolesapproval`,
    data: info
  }).then(response => {
    console.log('hello', response.data);
    dispatch({ type: RolesApprovalType.UPDATE_ROLES_APPROVAL_DATA, data: response.data });
  }).catch(error => {
    console.log(error);
  });
}
