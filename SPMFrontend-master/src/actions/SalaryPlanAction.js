import axios from 'axios';
import { SalaryPlanType, ErrorType } from './ActionType';
import { SalaryPlanUrl } from './ActionURL';
import { Configs } from './ActionConfigs';

export function getSalaryPlan() {
  return function (dispatch) {
    axios
    .get(SalaryPlanUrl.GET_EMPLOYEES, Configs.LOGINCONFIG)
    .then(employeesResponse => {
      dispatch({ type: SalaryPlanType.SET_EMPLOYEES, data: employeesResponse.data });
      axios
      .get(SalaryPlanUrl.GET_EMPLOYEE_BANDS, Configs.LOGINCONFIG)
      .then(bandsResponse => {
        dispatch({ type: SalaryPlanType.SET_EMPLOYEE_BANDS, data: bandsResponse.data });
        axios
        .get(SalaryPlanUrl.GET_MERIT_GUIDELINES, Configs.LOGINCONFIG)
        .then(meritGuidelinesResponse => {
          dispatch({ type: SalaryPlanType.SET_MERIT_GUIDELINES, data: meritGuidelinesResponse.data });
          axios
          .get(SalaryPlanUrl.GET_SALARYPLAN, Configs.LOGINCONFIG)
          .then(salaryPlanResponse => {
            dispatch({ type: SalaryPlanType.GET_SALARYPLAN, salaryPlan: salaryPlanResponse.data });
            axios
            .get(SalaryPlanUrl.GET_STI, Configs.LOGINCONFIG)
            .then(stiResponse => {
              dispatch({ type: SalaryPlanType.SET_STI, data: stiResponse.data });
              axios
              .get(SalaryPlanUrl.GET_TARGETS, Configs.LOGINCONFIG)
              .then(targetsResponse => {
                dispatch({ type: SalaryPlanType.SET_TARGETS, data: targetsResponse.data });
              })
              .catch(err => {
                dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
              });
            })
            .catch(err => {
              dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
            });
          })
          .catch(err => {
            dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
          });
        })
        .catch(err => {
          dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
    });
  };
}

export function getCompensationPlanning() {
  return function (dispatch) {
    axios
    .get(SalaryPlanUrl.GET_COMPENSATION_PLANNING, Configs.LOGINCONFIG)
    .then(response => {
      console.log(response.data);
      dispatch({ type: SalaryPlanType.SET_COMPENSATION_PLANNING, data: response.data });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
    });
  };
}

export function updateCompStatus(employeeid, status) {
  return function (dispatch) {
    dispatch({ type: SalaryPlanType.SET_COMPENSATION_STATUS, status, employeeid });
  };
}

export function setMeritAmount(employeeid, meritAmount) {
  return function (dispatch) {
    dispatch({ type: SalaryPlanType.SET_MERIT_AMOUNT, employeeid, meritAmount });
  };
}
export function saveCompPlan(salaryPlan) {
  return function (dispatch) {
    salaryPlan.map((sp, index) => {
      if (sp.isModified) {
        const url = `${SalaryPlanUrl.GET_SALARYPLAN}/${sp.employeeid}`;
        axios
        .put(url, JSON.stringify({ status: sp.status, meritamount: sp.meritAmount }), Configs.LOGINCONFIG)
        .then(response => {
          console.log(response);
        })
        .catch(err => {
          dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
        });
      }
      return index;
    });
  };
}
export function addSTI(obj, employeeid) {
  return function (dispatch) {
    axios
    .post(SalaryPlanUrl.GET_STI, JSON.stringify(obj), Configs.LOGINCONFIG)
    .then(response => {
      dispatch({ type: SalaryPlanType.ADD_STI, obj: response.data, employeeid });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
    });
  };
}
export function deleteSTI(id, employeeid) {
  return function (dispatch) {
    const stiDeleteUrl = `${SalaryPlanUrl.GET_STI}/${id}`;
    axios
    .delete(stiDeleteUrl, Configs.LOGINCONFIG)
    .then(response => {
      console.log(response.data);
      dispatch({ type: SalaryPlanType.DELETE_STI, id, employeeid });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
    });
  };
}

export function deleteTarget(id, employeeid) {
  return function (dispatch) {
    const targetDeleteUrl = `${SalaryPlanUrl.GET_TARGETS}/${id}`;
    axios
    .delete(targetDeleteUrl, Configs.LOGINCONFIG)
    .then(response => {
      console.log(response);
      dispatch({ type: SalaryPlanType.DELETE_TARGET, id, employeeid });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
    });
  };
}
export function updateMerit(compId, meritVal) {
  return function (dispatch) {
    dispatch({ type: SalaryPlanType.UPDATE_MERIT, compId, meritVal });
  };
}


export function addSalaryTargetPlan(obj, employeeid) {
  // console.log('Datasa', targetPlanData);
  return function (dispatch) {
    axios
    .post(SalaryPlanUrl.GET_TARGETS, JSON.stringify(obj), Configs.LOGINCONFIG)
    .then(response => {
      dispatch({ type: SalaryPlanType.ADD_SALARYPLAN_TARGET, obj: response.data, employeeid, planName: obj.planName });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}

export function getComplanStatus() {
  return function (dispatch) {
    axios
    .get(SalaryPlanUrl.GET_COMPENSATION_PLANNING_STATUS, Configs.LOGINCONFIG)
    .then(response => {
      dispatch({ type: SalaryPlanType.GET_COMPENSATION_PLANNING_STATUS, statusData: response.data });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}

//Get Employees By Band
export function getEmployeesByBands(bandId) {
  const url = SalaryPlanUrl.GET_EMPLOYESS_BY_BAND.concat(bandId);
  return function (dispatch) {
    axios
     .get(url, Configs.LOGINCONFIG)
     .then(response => {
       console.log('response', response.data);
       dispatch({ type: SalaryPlanType.GET_EMPLOYEES_BY_BAND, empBandData: response.data });
     })
     .catch(err => {
       dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
     });
  };
}
