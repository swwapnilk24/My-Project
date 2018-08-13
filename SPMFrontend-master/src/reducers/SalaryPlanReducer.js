import _ from 'lodash';
import dateformat from 'dateformat';
import { SalaryPlanType, ErrorType } from '../actions/ActionType';

const initialState = {
  performance_year: '2017-18',
  vesting_year: '2020-21',
  salaryPlan: [],
  message: null,
  employees: {},
  bands: [],
  merit_guideines: {},
  targetPlan: [],
  compPlanningStatus: [],
  bandByEmployees: []
};

export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case SalaryPlanType.SET_MERIT_AMOUNT: {
      const newSalaryPlan = [];
      st.salaryPlan.map((sp, index) => {
        if (sp.employeeid === action.employeeid) {
          const newSp = sp;
          newSp.meritAmount = action.meritAmount;
          newSp.isModified = true;
          newSalaryPlan.push(newSp);
        } else {
          newSalaryPlan.push(sp);
        }
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }
    case SalaryPlanType.SET_COMPENSATION_STATUS: {
      const newSalaryPlan = [];
      st.salaryPlan.map((sp, index) => {
        if (sp.employeeid === action.employeeid) {
          const newSp = sp;
          newSp.status = action.status;
          newSp.isModified = true;
          newSalaryPlan.push(newSp);
        } else {
          newSalaryPlan.push(sp);
        }
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }
    case SalaryPlanType.SET_EMPLOYEES: {
      const employees = {};
      action.data.map((employee, index) => {
        employees[employee.id] = employee;
        return index;
      });
      st = {
        ...state,
        employees
      };
      break;
    }

    case SalaryPlanType.SET_EMPLOYEE_BANDS: {
      st = {
        ...state,
        bands: action.data
      };
      break;
    }
    case SalaryPlanType.SET_COMPENSATION_PLANNING: {
      const newCompPlan = [];
      action.data.map((compPlan, index) => {
        const tempCompPlan = compPlan;
        tempCompPlan.name = compPlan.employee[0].name;
        tempCompPlan.jobTitle = compPlan.employee[0].jobtitle;
        tempCompPlan.minMerit = compPlan.employee[0].meritguidelines[0].min;
        tempCompPlan.maxMerit = compPlan.employee[0].meritguidelines[0].max;
        //STI dateformat change
        const newSti = [];
        tempCompPlan.sti.map((sti, index1) => {
          const tempSti = sti;
          tempSti.beginDate = dateformat(sti.beginDate, 'dd-mm-yyyy');
          tempSti.endDate = dateformat(sti.endDate, 'dd-mm-yyyy');
          newSti.push(tempSti);
          return index1;
        });
        //Segregating Targets
        const newTarget = [];
        let targetAmount = 0;
        let ltAmount = 0;
        tempCompPlan.target.map((target, index1) => {
          if (target.performance_year === st.performance_year) {
            const tempTarget = target;
            if (target.plandetails.length > 0) {
              tempTarget.planName = target.plandetails[0].name;
            }
            newTarget.push(tempTarget);
            targetAmount += target.amount;
          } else if (target.vesting_year === st.performance_year) {
            ltAmount += target.amount;
          }
          return index1;
        });
        //pushing calculated values;
        tempCompPlan.ltAmount = ltAmount;
        tempCompPlan.target = newTarget;
        tempCompPlan.targetAmount = targetAmount;
        tempCompPlan.isModified = false;
        newCompPlan.push(tempCompPlan);
        return index;
      });
      st = { ...state, salaryPlan: newCompPlan };
      break;
    }

    case SalaryPlanType.ADD_STI: {
      const newSalaryPlan = [];
      st.salaryPlan.map((salaryPlan, index) => {
        const tempSalaryPlan = salaryPlan;
        if (tempSalaryPlan.employeeid === action.employeeid) {
          const newSti = [];
          tempSalaryPlan.sti.map((sti, index2) => {
            newSti.push(sti);
            return index2;
          });
          newSti.push(action.obj);
          tempSalaryPlan.isModified = true;
          tempSalaryPlan.sti = newSti;
        }
        newSalaryPlan.push(tempSalaryPlan);
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }

    case SalaryPlanType.DELETE_TARGET: {
      const newSalaryPlan = [];
      st.salaryPlan.map((salaryPlan, index) => {
        const tempSalaryPlan = salaryPlan;
        if (tempSalaryPlan.employeeid === action.employeeid) {
          const newTarget = [];
          tempSalaryPlan.target.map((target, index2) => {
            /* eslint no-underscore-dangle: 0 */
            let id = target._id;
            if (id === undefined) {
              id = target.id;
            }
            if (id !== action.id) {
              newTarget.push(target);
            }
            return index2;
          });
          tempSalaryPlan.isModified = true;
          tempSalaryPlan.target = newTarget;
        }
        newSalaryPlan.push(tempSalaryPlan);
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }
    case SalaryPlanType.DELETE_STI: {
      const newSalaryPlan = [];
      st.salaryPlan.map((salaryPlan, index) => {
        const tempSalaryPlan = salaryPlan;
        if (tempSalaryPlan.employeeid === action.employeeid) {
          const newSti = [];
          tempSalaryPlan.sti.map((sti, index2) => {
            /* eslint no-underscore-dangle: 0 */
            if (sti._id !== action.id) {
              newSti.push(sti);
            }
            return index2;
          });
          tempSalaryPlan.isModified = true;
          tempSalaryPlan.sti = newSti;
        }
        newSalaryPlan.push(tempSalaryPlan);
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }

    case SalaryPlanType.SET_MERIT_GUIDELINES: {
      const guideLines = {};
      action.data.map((guideline, index) => {
        const key = `${guideline.band}_${guideline.performance_year}`;
        guideLines[key] = guideline;
        return index;
      });
      st = {
        ...state,
        merit_guideines: guideLines
      };
      break;
    }

    case SalaryPlanType.GET_SALARYPLAN: {
      const salaryPlans = [];
      action.salaryPlan.map((salaryPlan, index) => {
        const tempSalaryPlan = salaryPlan;
        tempSalaryPlan.jobTitle = st.employees[salaryPlan.employeeid].jobtitle;
        tempSalaryPlan.name = st.employees[salaryPlan.employeeid].name;
        const guidelineKey = `${st.employees[salaryPlan.employeeid].band}_${tempSalaryPlan.performance_year}`;
        tempSalaryPlan.minMerit = st.merit_guideines[guidelineKey].min;
        tempSalaryPlan.maxMerit = st.merit_guideines[guidelineKey].max;
        salaryPlans.push(tempSalaryPlan);
        return index;
      });
      st = {
        ...state,
        salaryPlan: salaryPlans
      };
      break;
    }

    case SalaryPlanType.SET_STI: {
      const newSti = {};
      console.log(action.data);
      action.data.map((sti, index) => {
        if (newSti[sti.employeeid] === undefined) {
          newSti[sti.employeeid] = [];
        }
        if (sti.performance_year === st.performance_year) {
          newSti[sti.employeeid].push(sti);
        }
        return index;
      });
      const newSalaryPlan = [];
      st.salaryPlan.map((salaryPlan, index) => {
        const tempSalaryPlan = salaryPlan;
        if (newSti[salaryPlan.employeeid] !== undefined) {
          tempSalaryPlan.sti = newSti[salaryPlan.employeeid];
        } else {
          tempSalaryPlan.sti = [];
        }
        newSalaryPlan.push(tempSalaryPlan);
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }

    case SalaryPlanType.SET_TARGETS: {
      const newTargets = {};
      action.data.map((target, index) => {
        if (newTargets[target.employeeid] === undefined) {
          newTargets[target.employeeid] = [];
        }
        if (target.performance_year === st.performance_year) {
          newTargets[target.employeeid].push(target);
        }
        return index;
      });
      const newSalaryPlan = [];
      st.salaryPlan.map((salaryPlan, index) => {
        const tempSalaryPlan = salaryPlan;
        if (newTargets[salaryPlan.employeeid] !== undefined) {
          tempSalaryPlan.target = newTargets[salaryPlan.employeeid];
        } else {
          tempSalaryPlan.target = [];
        }
        newSalaryPlan.push(tempSalaryPlan);
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }

    case SalaryPlanType.UPDATE_MERIT: {
      const tempSalPlan = st.salaryPlan;
      const index = _.findIndex(tempSalPlan, { id: action.compId });
      const tmpSal = tempSalPlan[index];
      tmpSal.merit = action.meritVal;
      tempSalPlan.splice(index, 1, tmpSal);
      st = {
        ...state,
        salaryPlan: tempSalPlan
      };
      break;
    }
    case SalaryPlanType.ADD_SALARYPLAN_TARGET: {
      // const abs = targetPlan;
      const newSalaryPlan = [];
      st.salaryPlan.map((salaryPlan, index) => {
        if (salaryPlan.employeeid === action.employeeid) {
          const tempSalaryPlan = salaryPlan;
          const tempObj = action.obj;
          tempObj.planName = action.planName;
          tempSalaryPlan.target.push(tempObj);
          tempSalaryPlan.isModified = true;
          newSalaryPlan.push(tempSalaryPlan);
        } else {
          newSalaryPlan.push(salaryPlan);
        }
        return index;
      });
      st = { ...state, salaryPlan: newSalaryPlan };
      break;
    }
    case SalaryPlanType.GET_COMPENSATION_PLANNING_STATUS: {
      const complanStatus = [];
      // const newCompPlaningStatusData = action.statusData;
      action.statusData.map((items, index) => {
        complanStatus.push(items);
        return index;
      });
      st = {
        ...state,
        compPlanningStatus: complanStatus
      };
      break;
    }
    case SalaryPlanType.GET_EMPLOYEES_BY_BAND: {
      console.log('Welcome Data', action.empBandData);
      const empBand = [];
      action.empBandData.map((items, i) => {
        empBand.push(items);
        return i;
      });
      st = {
        ...state,
        bandByEmployees: empBand
      };
      break;
    }
    case ErrorType.ERROR_LOG: {
      st = {
        ...state,
        message: action.message
      };
      break;
    }

    default: {
      return st;
    }
  }
  return st;
}
