/**
 * Created by svs on 9/10/17.
 */
import axios from 'axios';
import { setNewEmployee, setCurrentEmployee, createNewEmployee, getLastEmployeeId, getLastTempEmployeeId, getListOfMyEmployeesData, searchEmployeeById, getListofMyTempEmployees, menuMasterData, usersData, menuMappingInfoData } from '../actions/EmployeeActions';
import { setProcessedStatus, setLeavesIndividual } from '../actions/LeavesMasterDataAction';
// import { EmployeeType } from '../actions/ActionType';
import { server } from './config';
// import { EmployeeType, ErrorType } from '../actions/ActionType';


const request = require('superagent');

export const updateNewEmployee = (employeeData, shouldUpdateState, dispatch, setSyncedWithServer) => {
  console.log(employeeData);
  const url = `${server}/employees/updateNewEmployee`;
  request.post(url)
  .send(employeeData)
  .set('access_token', 'masterKey')
  .set('Accept', 'application/json')
    .end((err, res) => {
      if (err || !res.ok) {
        console.log(err);
      } else {
        console.log('checking idprop', JSON.stringify(res.body));
        setSyncedWithServer(true);
        if (shouldUpdateState) {
          console.log('updating state');
          if (Object.keys(res.body).length !== 0) {
            dispatch(setNewEmployee(res.body));
          }
        }
      }
    });
};

export const updateTempNewEmployee = (employeeData, shouldUpdateState, dispatch, setSyncedWithServer, getNewEmployeeId) => {
  const url = `${server}/tempemployees/updateNewEmployee`;
  request.post(url)
  .send(employeeData)
  .set('access_token', 'masterKey')
  .set('Accept', 'application/json')
    .end((err, res) => {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        // console.log(JSON.stringify(res.body));
        console.log('checking idprop', res.body.id);
        // alert(res.body.id);
        getNewEmployeeId(res.body.id);
        setSyncedWithServer(true);
        if (shouldUpdateState) {
          dispatch(setNewEmployee(res.body));
        }
      }
    });
};

export const deleteTempNewEmployee = (empID) => {
  const url = `${server}/tempemployees/${empID}`;
  request.delete(url)
  .set('access_token', 'masterKey')
  .set('Accept', 'application/json')
    .end((err, res) => {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log(JSON.stringify(res.body));
        // setSyncedWithServer(true);
        // if (shouldUpdateState) {
        //   console.log('updating state');
        //   dispatch(setNewEmployee(res.body));
        // }
      }
    });
};

export const findNewEmployee = (employeeData, shouldUpdateState, dispatch) => {
  const url = `${server}/employees/findNewEmployee`;// `${server}/employees/findNewEmployee`;
  request.post(url)
    .send(employeeData)
    .set('access_token', 'masterKey')
    .set('Accept', 'application/json')
    .end((err, res) => {
      if (err || !res.ok) {
        console.log('Oh no! error');
      } else {
        console.log(JSON.stringify(res.body));
        if (shouldUpdateState) {
          console.log(server);
          console.log('updating state');
          dispatch(setNewEmployee(res.body));
        }
      }
    });
};

export const getCurrentEmployeeData = (shouldUpdateState, dispatch) => {
  console.log('Welcome to Get Service');
  const url = `${server}/employees/getCurrentEmployeeData`;
  // console.log('Welcome to Get url ', url);
  // console.log('State ', shouldUpdateState);
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else {
       console.log('Employee Data');
       if (shouldUpdateState) {
         console.log('buggoes', res.body);
         if (Object.keys(res.body).length !== 0) {
           dispatch(setCurrentEmployee(res.body));
         }
         //dispatch(setCurrentEmployee(res.body));
       }
     }
     // getCurrentEmployee
   });
};

export const getLastEmployeeData = (shouldUpdateState, dispatch) => {
  console.log('Welcome Data');
  const url = `${server}/employees/getLastEmployeeData`;
  // console.log('Welcome to Get url ', url);
  // console.log('State ', shouldUpdateState);
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else {
       console.log(JSON.stringify(res.body));
       if (shouldUpdateState) {
         console.log(dispatch);
         dispatch(getLastEmployeeId(res.body));
         console.log('Employee Data', JSON.stringify(res.body));
       }
     }
     // getCurrentEmployee
   });
};

export const getLastTempEmployeeData = (shouldUpdateState, dispatch) => {
  console.log('Welcome Data');
  const url = `${server}/tempemployees/getLastEmployeeData`;
  // console.log('Welcome to Get url ', url);
  // console.log('State ', shouldUpdateState);
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else {
       console.log(JSON.stringify(res.body));
       if (shouldUpdateState) {
         console.log(dispatch);
         dispatch(getLastTempEmployeeId(res.body));
         console.log('Employee Data', JSON.stringify(res.body));
       }
     }
     // getCurrentEmployee
   });
};

export const getListOfMyEmployees = (shouldUpdateState, dispatch) => {
  console.log('Welcome to My Employees');
  const url = `${server}/employees/myEmployees`;
  console.log('Welcome to Get url ', url);
  console.log('State ', shouldUpdateState);
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else {
       console.log(JSON.stringify(res.body));
       if (shouldUpdateState) {
         // console.log('Employee Data', JSON.stringify(res.body));
         dispatch(getListOfMyEmployeesData(res.body));
         // console.log('Employee Data', JSON.stringify(res.body));
       }
     }
     // getCurrentEmployee
   });
};

export const getListOfMyTempEmployees = (shouldUpdateState, dispatch) => {
  console.log('Welcome to My Employees');
  const url = `${server}/tempemployees/myEmployees`;
  console.log('Welcome to Get url ', url);
  console.log('State ', shouldUpdateState);
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else {
       console.log(JSON.stringify(res.body));
       if (shouldUpdateState) {
         console.log('TempEmployee Data', JSON.stringify(res.body));
         dispatch(getListofMyTempEmployees(res.body));
         // console.log('Employee Data', JSON.stringify(res.body));
       }
     }
     // getCurrentEmployee
   });
};

export const createNewEmployeeData = (employeeData, shouldUpdateState, dispatch) => {
  const url = `${server}/employees`;
  console.log('NewEmployee', employeeData);
  request.post(url)
  .send(employeeData)
  .set('access_token', 'masterKey')
  .set('Accept', 'application/json')
  .end((err, res) => {
    console.log('NewEmployee', JSON.stringify(res.body));
    if (err || !res.ok) {
      console.log('Oh no! error');
    } else {
      console.log(JSON.stringify(res.body));
      dispatch(createNewEmployee(employeeData));
      if (shouldUpdateState) {
        console.log(server);
        console.log('updating state');
      }
    }
  });
};

//Get Top Record of employees collection

export const getFirstDocumentData = (shouldUpdateState, dispatch, empId) => {
  console.log('Welcome to My Employees');
  console.log(empId);
  const url = `${server}/employees/firstRecord/${empId}`;
  console.log('Welcome to Get url ', url);
  console.log('State ', shouldUpdateState);
  request.get(url)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     if (err || !res.ok) {
       console.log('Oh no! error');
     } else {
       console.log('dispatch', JSON.stringify(res.body));
       if (shouldUpdateState) {
         console.log('Employee Data', JSON.stringify(res.body));
         console.log('dispatch', dispatch);
         dispatch(searchEmployeeById(res.body));
        //  dispatch(getListOfMyEmployeesData(res.body));
         console.log('Employee Data', JSON.stringify(res.body));
       }
     }
     // getCurrentEmployee
   });
};

export const counterForNewEmployee = (data, counterValue) => {
  const url = `${server}/autoIncrementTempEmp`;
  request.post(url)
   .send(data)
   .set('access_token', 'masterKey')
   .set('Accept', 'application/json')
   .end((err, res) => {
     console.log(res, err);
     counterValue(res.body.nextCounterValue);
   });
};

export const creditTimeOffTypes = (data, dispatch) => {
  const url = `${server}/employees/creditTimeOff`;
  axios.post(url, data)
    .then(res => {
      console.log('status after crediting timeoffs: ', res.data);
      dispatch(setProcessedStatus(res.data));
    })
    .catch(error => {
      console.log(error);
    });
};

export function getMenuMasterData(dispatch) {
  axios({
    method: 'get',
    url: `${server}/menuMaster`
  }).then(response => {
    console.log(response.data);
    dispatch(menuMasterData(response.data));
  });
}

export function getUsersData(dispatch) {
  axios({
    method: 'get',
    url: `${server}/users`
  }).then(response => {
    console.log(response.data);
    dispatch(usersData(response.data));
  });
}

export function getmenuMappingInfoData(info, shouldUpdateState, dispatch) {
  console.log(info);
  axios({
    method: 'post',
    url: `${server}/menuMapping`,
    data: info
  }).then(response => {
    console.log(info, response.data);
    const data = response.data;
    dispatch(menuMappingInfoData({ info, shouldUpdateState, data }));
  });
}

// export function getAllMyEmployees(dispatch) {
//   const url = `${server}/employees/myEmployees`;
//   axios.get(url)
//     .then(res => {
//       console.log(res.data, dispatch);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

export const creditIndividualTimeOffTypes = (data, dispatch, callback) => {
  const url = `${server}/employees/creditIndividualTimeOff`;
  axios.post(url, data)
    .then(res => {
      console.log('status after crediting individual timeoffs: ', res.data);
      callback(res.data);
      if (!res.data.message) {
        dispatch(setLeavesIndividual(res.data));
      }
    })
    .catch(error => {
      console.log(error);
    });
};

// export function getCurrentEmployee(empId) {
//   console.log('Response', empId);
//   return function (dispatch) {
//     axios
//       .get(`${server}/employees/firstRecord/${empId}`)
//       .then(response => {
//         console.log('Response', response.data);
//         dispatch(searchEmployeeById(response.data));
//       })
//       .catch(err => {
//         console.log('Err', err);
//         // dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
//       });
//   };
// }
