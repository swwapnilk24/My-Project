import axios from 'axios';
import { server } from './config';
import { updateAuditData, updateWorkerAuditData, updateLeavesAuditData } from '../actions/AuditActions';

export function updateAuditInfo(auditData, dispatch) {
  console.log('making a service call', auditData);
  console.log('server in audits', `${server}/audit`);
  axios.post(`${server}/audit`, auditData)
    .then(res => {
      console.log('After adding audits: ', res.data);
      dispatch(updateAuditData(res.data));
    })
    .catch(error => {
      console.log(error);
    });
}

export function getEmployeeAuditData(dispatch) {
  console.log('server in audits', `${server}/audit`);
  axios.get(`${server}/audit`)
    .then(res => {
      console.log('After adding audits: ', res.data);
      if (Object.keys(res.data).length !== 0) {
        dispatch(updateAuditData(res.data));
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function getworkersAuditData(dispatch) {
  console.log('server in audits', `${server}/audit`);
  axios.get(`${server}/audit/workers`)
    .then(res => {
      console.log('After adding audits: ', res.data);
      if (Object.keys(res.data).length !== 0) {
        dispatch(updateWorkerAuditData(res.data));
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function updateLeavesAudit(auditData, id, dispatch) {
  console.log('making a service call', auditData, id);
  console.log('server in audits', `${server}/leavesAudit`);
  const url = `${server}/leavesAudit`;
  // let url = '';
  // if (id === undefined) {
  //   url = `${server}/leavesAudit`;
  //   console.log(url);
  // } else {
  //   url = `${server}/leavesAudit/${id}`;
  //   console.log(url);
  // }
  axios.post(url, auditData)
    .then(res => {
      console.log('After adding audits: ', res.data);
      if (res.data.id === null) {
        alert('error');
      } else {
        dispatch(updateLeavesAuditData(res.data));
      }
    })
    .catch(error => {
      console.log(error);
    });
}

export function getLeavesAudit(dispatch) {
  console.log('server in audits', `${server}/leavesAudit`);
  axios.get(`${server}/leavesAudit`)
    .then(res => {
      console.log('After adding audits: ', res.data);
      if (Object.keys(res.data).length !== 0) {
        dispatch(updateLeavesAuditData(res.data));
      }
    })
    .catch(error => {
      console.log(error);
    });
}

