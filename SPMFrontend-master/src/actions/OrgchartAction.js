import axios from 'axios';
import { OrgChart, ErrorType } from './ActionType';
import { OrgChartDataURL, SalaryPlanUrl } from './ActionURL';
import { Configs } from './ActionConfigs';

export function setExpandRows(data, view) {
  return function (dispatch) {
    dispatch({ type: OrgChart.SET_DATAGRID_EXPAND, data, view });
  };
}
export function deleteSimulationVersion(id) {
  return function (dispatch) {
    const deleteUrl = `${OrgChartDataURL.COMP_SIMULATION}/${id}`;
    axios
    .delete(deleteUrl, Configs.ORG_CHART_CONFIG)
    .then(response => {
      dispatch({ type: OrgChart.DELETE_SIMULATED_VERSION, data: response.data, id });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}
export function getEmployeeRatings() {
  return function (dispatch) {
    axios
    .get(OrgChartDataURL.GET_RATINGS, Configs.ORG_CHART_CONFIG)
    .then(response => {
      dispatch({ type: OrgChart.SET_RATINGS, data: response.data });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}
export function loadSimulationVersions() {
  return function (dispatch) {
    axios
    .get(OrgChartDataURL.COMP_SIMULATION, Configs.ORG_CHART_CONFIG)
    .then(response => {
      dispatch({ type: OrgChart.LOAD_SIMULATED_VERSION, data: response.data });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}
export function saveSimulationVersion(employeeid, versionName, data, meritRange, ipfRange, ltiRange) {
  return function (dispatch) {
    axios
    .post(OrgChartDataURL.COMP_SIMULATION, JSON.stringify({ employeeid, meritRange, ipfRange, ltiRange, versionName, versionData: data }), Configs.ORG_CHART_CONFIG)
    .then(response => {
      dispatch({ type: OrgChart.SAVE_SIMULATED_VERSION, data: response.data });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}
export function recalculateBudget(value, key) {
  return function (dispatch) {
    axios
    .get(OrgChartDataURL.GET_MERIT_GUIDELINES, Configs.ORG_CHART_CONFIG)
    .then(meritResponse => {
      dispatch({ type: OrgChart.SET_MERIT_GUIDELINES, data: meritResponse.data });
      console.log('meritResponse ', meritResponse.data);
      axios
      .get(OrgChartDataURL.ORGCHART_DATA, Configs.ORG_CHART_CONFIG)
      .then(response => {
        console.log('recalculateBudget ', response.data);
        dispatch({ type: OrgChart.SET_FORMATTED_BUDGET, budget: response.data });
        const action = { type: OrgChart.CALCULATE_BUDGET };
        action[key] = value;
        dispatch(action);
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
      });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}

function getNewEmployeeBudget() {
  return {
    name: 'New Employee',
    abs: 0,
    target: 0,
    budget: 0,
    title: '',
    parent: null,
    parentName: '',
    merit: 0,
    ipf: '0%',
    bpf: '0%',
    cpf: 0,
    performance: 0
  };
}
export function addEmployee(parent) {
  return function (dispatch) {
    const newEmployee = getNewEmployeeBudget();
    newEmployee.parent = parent;
    axios
    .post(OrgChartDataURL.ADD_EMPLOYEE, JSON.stringify(newEmployee), Configs.ORG_CHART_CONFIG)
    .then(response => {
      const URL = `${OrgChartDataURL.ORGCHART_DATA}/${response.data.id}`;
      const empObj = response.data;
      empObj.key = empObj.id;
      axios
      .put(URL, JSON.stringify(empObj), Configs.ORG_CHART_CONFIG)
      .then(responseWithKey => {
        dispatch({ type: OrgChart.ADD_EMPLOYEE, newEmployee: responseWithKey.data });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
      });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}
export function updateEmployee(id, updatedObj) {
  return function (dispatch) {
    const employeeUpdateUrl = `${OrgChartDataURL.ORGCHART_DATA}/${id}`;
    axios
    .put(employeeUpdateUrl, JSON.stringify(updatedObj), Configs.ORG_CHART_CONFIG)
    .then(response => {
      dispatch({ type: OrgChart.UPDATE_EMPLOYEE, obj: response.data });
      dispatch({ type: OrgChart.CALCULATE_BUDGET, sliderData: null });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}
export function removeEmployee(id) {
  return function (dispatch) {
    const employeeDeleteUrl = `${OrgChartDataURL.ORGCHART_DATA}/${id}`;
    axios
    .delete(employeeDeleteUrl, Configs.ORG_CHART_CONFIG)
    .then(response => {
      console.log('on delete', response);
      dispatch({ type: OrgChart.DELETE_EMPLOYEE, id });
      dispatch({ type: OrgChart.CALCULATE_BUDGET, sliderData: null });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}

export function changeHierarchyType(type) {
  return function (dispatch) {
    dispatch({ type: OrgChart.CHANGE_HIERARCHY, view: type });
    axios
    .get(OrgChartDataURL.ORGCHART_DATA, Configs.ORG_CHART_CONFIG)
    .then(response => {
      dispatch({ type: OrgChart.SET_FORMATTED_BUDGET, budget: response.data });
      dispatch({ type: OrgChart.CALCULATE_BUDGET });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}

export function changeViewType(type) {
  return function (dispatch) {
    dispatch({ type: OrgChart.CHANGE_DATA_REPRESENTATION, view: type });
  };
}

export function addNewEmployee(employeeData, abs) {
  console.log('Response Data', employeeData);
  return function (dispatch) {
    axios
     .post(OrgChartDataURL.ADD_NEW_EMPLOYEE, JSON.stringify(employeeData), Configs.ORG_CHART_CONFIG)
     .then(response => {
       console.log(response.data);
       dispatch({ type: OrgChart.ADD_NEW_EMPLOYEE, new_employee: response.data });
       const empObj = response.data;
       empObj.employeeid = empObj.id;
       empObj._id = empObj.id; // eslint-disable-line no-underscore-dangle
       empObj.currentsalary = abs.currentsalary;
       empObj.objective = 1;
       empObj.behaviour = 1;
       empObj.currencycode = 'USD';
       empObj.ipf = 30;
       empObj.bpf = 100;
       empObj.cpf = 30;
       empObj.meritamount = 0;
       empObj.merit = 0;
       empObj.performance_year = '2017-18';
       axios
        .post(SalaryPlanUrl.ADD_SALARY_PLAN, JSON.stringify(empObj), Configs.ORG_CHART_CONFIG)
        .then(responseEmployee => {
          axios
           .post(OrgChartDataURL.ADD_NEW_ORGHIERARCHY, JSON.stringify({ employeeid: empObj.id, cpm_manager: abs.managerId, operational_manager: abs.managerId }), Configs.ORG_CHART_CONFIG)
           .then(responseOrgHierarchy => {
             axios
              .get(OrgChartDataURL.ORGCHART_DATA, Configs.ORG_CHART_CONFIG)
              .then(budgetResponse => {
                dispatch({ type: OrgChart.SET_FORMATTED_BUDGET, budget: budgetResponse.data });
                dispatch({ type: OrgChart.CALCULATE_BUDGET, responseEmployee, responseOrgHierarchy });
              })
              .catch(err => {
                dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
              });
           });
        })
        .catch(errEmpCompPlan => {
          dispatch({ type: ErrorType.ERROR_LOG, message: errEmpCompPlan.message });
        });
     })
     .catch(err => {
       dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
     });
  };
}
