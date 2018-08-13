import axios from 'axios';
import { server } from './config';
import { fetchRoleTypes } from '../actions/RoleActions';

export function getRoleTypes(dispatch) {
  console.log('server in roles', `${server}/roleMaster`);
  axios.get(`${server}/roleMaster`)
    .then(res => {
      console.log('After adding role types: ', res.data);
      if (Object.keys(res.data).length !== 0) {
        dispatch(fetchRoleTypes(res.data));
      }
    })
    .catch(error => {
      console.log(error);
    });
}
