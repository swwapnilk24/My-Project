import AppConfig from '../config';
import { getMasterDataFromDB, getErrorCodesMasterDataFromDB } from '../actions/MasterDataAction';

const request = require('superagent');

export const getMasterDataInfo = (shouldUpdateState, dispatch) => {
  // console.log('shouldUpdateState: ', shouldUpdateState);
  const url = `${AppConfig.BASE_URL}master`;
  // const url = `${server}/master`;
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else {
       console.log('t');
       if (shouldUpdateState) {
         dispatch(getMasterDataFromDB(res.body));
       }
     }
   });
};

export const getErrorCodesInfo = (shouldUpdateState, dispatch) => {
  console.log('shouldUpdateState: ', shouldUpdateState);
  const url = `${AppConfig.BASE_URL}errorcodesmaster`;
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else if (shouldUpdateState) {
       dispatch(getErrorCodesMasterDataFromDB(res.body));
     }
   });
};
