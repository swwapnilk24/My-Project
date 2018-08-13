/**
 * Created by svs on 9/10/17.
 */
import { server } from './config';
import { setCurrentEmployee } from '../actions/EmployeeActions';

const request = require('superagent');

export const updateCompanyInfo = (employeeData, shouldUpdateState, dispatch, setSyncedWithServer) => {
  console.log('employeeData =', employeeData);
  // console.log('shouldUpdateState =', shouldUpdateState);
  // console.log('dispatch = ', dispatch);
  // console.log('setSyncedWithServer = ', setSyncedWithServer);
  console.log('server=', server);
  const url = `${server}/employees/updateNewEmployee`;
  request.post(url)
  .send(employeeData)
  .set('access_token', 'masterKey')
  .set('Accept', 'application/json')
    .end((err, res) => {
      console.log('response', res);
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log(JSON.stringify(res.body));
        setSyncedWithServer(true);
        if (shouldUpdateState) {
          console.log('updating state');
          dispatch(setCurrentEmployee(res.body));
        }
      }
    });
};
