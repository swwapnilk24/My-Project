import { OrgChart } from '../actions/ActionType';

const initialState = {
  current_view: 'operational_manager',
  data_representation: 'chart',
  budgets: [],
  employees: [],
  formattedBudget: [],
  org_hierarchy: {},
  ipf_range: 'min',
  merit_range: 'min',
  lti_range: 'min',
  employee_id: '5a20fdb4dad4f61c9cdb3e79',
  new_employee: {},
  ratings: {},
  comp_versions: [],
  current_version_id: '',
  merit_guidelines: {},
  master_table_expanded: {},
  merit_table_expanded: {},
  sti_table_expanded: {},
  lti_table_expanded: {}
};

function getLtiBudget(employeeid, ltiValue, meritSliderValue, budgetData, orgHierarchy, guideLines) {
  let tempBudget = 0;
  budgetData.map((item, index) => {
    if (employeeid === item.key) {
      const meritValue = guideLines[item.band][meritSliderValue];
      const currentEmpBudget = Math.round(((((item.ABS * meritValue) / 100) + item.ABS) * ltiValue) / 100);
      let childrenBudget = 0;
      orgHierarchy[item.key].children.map((child, index1) => {
        childrenBudget += getLtiBudget(child, ltiValue, meritSliderValue, budgetData, orgHierarchy, guideLines);
        return index1;
      });
      tempBudget = currentEmpBudget + childrenBudget;
    }
    return index;
  });
  return tempBudget;
}

function getStiBudget(employeeid, cpfValue, budgetData, orgHierarchy, ratings) {
  let tempBudget = 0;
  budgetData.map((item, index) => {
    if (employeeid === item.key) {
      const currentEmpBudget = Math.round((((item.ABS * cpfValue) / 100) * item.TGT) / 100);
      let childrenBudget = 0;
      orgHierarchy[item.key].children.map((child, index1) => {
        childrenBudget += getStiBudget(child, cpfValue, budgetData, orgHierarchy, ratings);
        return index1;
      });
      tempBudget = currentEmpBudget + childrenBudget;
    }
    return index;
  });
  return tempBudget;
}

function getMeritBudget(employeeid, meritSliderValue, budgetData, orgHierarchy, guideLines) {
  let tempBudget = 0;
  budgetData.map((item, index) => {
    if (employeeid === item.key) {
      const meritValue = guideLines[item.band][meritSliderValue];
      const currentEmpBudget = Math.round((item.ABS * meritValue) / 100);
      let childrenBudget = 0;
      orgHierarchy[item.key].children.map((child, index1) => {
        childrenBudget += getMeritBudget(child, meritSliderValue, budgetData, orgHierarchy, guideLines);
        return index1;
      });
      tempBudget = currentEmpBudget + childrenBudget;
    }
    return index;
  });
  return tempBudget;
}
function getAllChildrenBudget(employeeid, key, budgetData, orgHierarchy) {
  let tempBudget = 0;
  budgetData.map((item, index) => {
    if (employeeid === item.key) {
      let currentEmpBudget = 0;
      currentEmpBudget = item[key];
      console.log('budget', employeeid, currentEmpBudget);
      let childrenBudget = 0;
      orgHierarchy[item.key].children.map((child, index1) => {
        childrenBudget += getAllChildrenBudget(child, key, budgetData, orgHierarchy);
        return index1;
      });
      console.log('children', employeeid, childrenBudget);
      tempBudget = currentEmpBudget + childrenBudget;
    }
    return index;
  });
  return tempBudget;
}
export default function reducer(state = initialState, action) {
  let st = state;
  switch (action.type) {
    case OrgChart.DELETE_SIMULATED_VERSION: {
      const tempSimulatedVersions = [];
      st.comp_versions.map((version, index) => {
        if (version.id !== action.id) {
          tempSimulatedVersions.push(version);
        }
        return index;
      });
      st = { ...state, comp_versions: tempSimulatedVersions };
      break;
    }
    case OrgChart.SET_DATAGRID_EXPAND: {
      let masterTableExpanded = st.master_table_expanded;
      let meritTableExpanded = st.merit_table_expanded;
      let stiTableExpanded = st.sti_table_expanded;
      let ltiTableExpanded = st.lti_table_expanded;
      if (action.view === 'lti') {
        ltiTableExpanded = action.data;
      } else if (action.view === 'sti') {
        stiTableExpanded = action.data;
      } else if (action.view === 'master') {
        masterTableExpanded = action.data;
      } else if (action.view === 'merit') {
        meritTableExpanded = action.data;
      }
      st = { ...state, master_table_expanded: masterTableExpanded, merit_table_expanded: meritTableExpanded, sti_table_expanded: stiTableExpanded, lti_table_expanded: ltiTableExpanded };
      break;
    }
    case OrgChart.LOAD_SPECIFIC_VERSION: {
      let newVersion = st.formattedBudget;
      let currentVersionId = st.current_version_id;
      let ipfRange = st.ipf_range;
      let meritRange = st.merit_range;
      let ltiRange = st.lti_range;
      st.comp_versions.map((version, index) => {
        if (version.id === action.version) {
          currentVersionId = version.id;
          newVersion = version.versionData;
          ipfRange = version.ipfRange;
          meritRange = version.meritRange;
          ltiRange = version.ltiRange;
        }
        return index;
      });
      st = { ...state, ipf_range: ipfRange, merit_range: meritRange, lti_range: ltiRange, formattedBudget: newVersion, current_version_id: currentVersionId };
      break;
    }
    case OrgChart.LOAD_SIMULATED_VERSION: {
      const newVersions = action.data;
      st = { ...state, comp_versions: newVersions };
      break;
    }
    case OrgChart.SAVE_SIMULATED_VERSION: {
      const newVersions = [];
      st.comp_versions.map((version, index) => {
        newVersions.push(version);
        return index;
      });
      newVersions.push(action.data);
      st = { ...state, comp_versions: newVersions };
      break;
    }
    case OrgChart.SET_RATINGS: {
      const newRatings = {};
      action.data.map((rating, index) => {
        const key = `${rating.objective}:${rating.behaviour}`;
        newRatings[key] = rating;
        return index;
      });
      st = { ...state, ratings: newRatings };
      break;
    }
    case 'UPDATE_EMPLOYEE': {
      const newBudget = [];
      st.formattedBudget.map((budget, index) => {
        const tempBudget = budget;
        if (budget.key === action.obj.id) {
          tempBudget.name = action.obj.name;
          tempBudget.target = action.obj.target;
          tempBudget.abs = action.obj.abs;
        }
        newBudget.push(tempBudget);
        return index;
      });
      const overAllBudget = [];
      newBudget.map((budget, index) => {
        const tempBudget = budget;
        const currentLevelBudget = getAllChildrenBudget(budget.key, st.formattedBudget, st.org_hierarchy);
        tempBudget.budget = currentLevelBudget;
        // console.log('CPF', currentLevelBudget / budget.cpf);
        overAllBudget.push(tempBudget);
        return index;
      });
      st = { ...state, formattedBudget: overAllBudget };
      break;
    }
    case OrgChart.SET_FORMATTED_BUDGET: {
      const orgHierarchy = {};
      const currentManager = st.current_view;
      const budgets = [];
      action.budget.map((budget, index) => {
        if (budget[currentManager] !== undefined) {
          if (orgHierarchy[budget[currentManager]] === undefined) {
            orgHierarchy[budget[currentManager]] = {};
            orgHierarchy[budget[currentManager]].children = [];
          }
          orgHierarchy[budget[currentManager]].children.push(budget.employeeid);
        }
        if (orgHierarchy[budget.employeeid] === undefined) {
          orgHierarchy[budget.employeeid] = {};
          orgHierarchy[budget.employeeid].children = [];
        }
        const tempBudgetNew = {};
        tempBudgetNew.employeeid = budget.employeeid;
        tempBudgetNew.name = budget.employee.name;
        tempBudgetNew.band = budget.employee.band;
        tempBudgetNew.title = budget.employee.jobtitle;
        tempBudgetNew.parent = budget[currentManager];
        tempBudgetNew.key = budget.employeeid;
        tempBudgetNew.TGT = 20;
        tempBudgetNew.rating = `${budget.compensationPlan.objective}:${budget.compensationPlan.behaviour}`;
        tempBudgetNew.IPF = budget.compensationPlan.ipf;
        tempBudgetNew.BPF = budget.compensationPlan.bpf;
        tempBudgetNew.CPF = budget.compensationPlan.cpf;
        tempBudgetNew.ABS = budget.compensationPlan.currentsalary;
        tempBudgetNew.MERIT = budget.compensationPlan.merit;
        tempBudgetNew.STI = (budget.compensationPlan.currentsalary * budget.compensationPlan.cpf) / 100;
        tempBudgetNew.LTI = (budget.compensationPlan.currentsalary * budget.compensationPlan.cpf) / 100;
        tempBudgetNew.CPF = 10;
        budgets.push(tempBudgetNew);
        return index;
      });
      st = { ...state, formattedBudget: budgets, org_hierarchy: orgHierarchy };
      break;
    }
    case OrgChart.SET_MERIT_GUIDELINES: {
      const guideLines = {};
      action.data.map((guideline, index) => {
        guideLines[guideline.band] = guideline;
        return index;
      });
      st = {
        ...state,
        merit_guidelines: guideLines
      };
      break;
    }
    /*
    * This will be caled every time when we change the simulator controls
    */
    case 'CALCULATE_BUDGET': {
      const newBudget = [];
      let sliderValue = st.ipf_range;
      let meritSliderValue = st.merit_range;
      let ltiSlidervalue = st.lti_range;
      if (action.sti !== null && action.sti !== undefined) {
        sliderValue = action.sti;
      }
      if (action.merit !== null && action.merit !== undefined) {
        meritSliderValue = action.merit;
      }
      if (action.lti !== null && action.lti !== undefined) {
        ltiSlidervalue = action.lti;
      }
      const ltiRanges = { min: 1, mid: 2, max: 3 };
      st.formattedBudget.map((budget, index) => {
        const tempBudget = budget;
        const meritValue = st.merit_guidelines[tempBudget.band][meritSliderValue];
        const ltiValue = ltiRanges[ltiSlidervalue];
        tempBudget.IPF = st.ratings[budget.rating][sliderValue];
        tempBudget.MERIT = Math.round(((meritValue * tempBudget.ABS) / 100));
        tempBudget.CPF = Math.round(((tempBudget.BPF * tempBudget.IPF) / 100));
        tempBudget.STI = Math.round((((tempBudget.ABS * tempBudget.CPF) / 100) * tempBudget.TGT) / 100);
        tempBudget.NewABS = tempBudget.MERIT + tempBudget.ABS;
        tempBudget.LTI = Math.round((ltiValue * tempBudget.NewABS) / 100);
        tempBudget.StiBudget = getStiBudget(budget.employeeid, tempBudget.CPF, st.formattedBudget, st.org_hierarchy, st.ratings);
        tempBudget.MeritBudget = getMeritBudget(budget.employeeid, meritSliderValue, st.formattedBudget, st.org_hierarchy, st.merit_guidelines);
        tempBudget.LtiBudget = getLtiBudget(budget.employeeid, ltiValue, meritSliderValue, st.formattedBudget, st.org_hierarchy, st.merit_guidelines);
        newBudget.push(tempBudget);
        return index;
      });
      st = { ...state, formattedBudget: newBudget, ipf_range: sliderValue, merit_range: meritSliderValue, lti_range: ltiSlidervalue };
      break;
    }
    case 'ADD_EMPLOYEE': {
      const formattedBudgetNew = [];
      st.formattedBudget.map((budget, index) => {
        formattedBudgetNew.push(budget);
        return index;
      });
      const newEmployee = action.newEmployee;
      formattedBudgetNew.push(newEmployee);
      const newOrgHierarcy = st.org_hierarchy;
      newOrgHierarcy[action.newEmployee.parent].children.push(newEmployee.key);
      newOrgHierarcy[newEmployee.key] = {};
      newOrgHierarcy[newEmployee.key].children = [];
      st = { ...state, formattedBudget: formattedBudgetNew, org_hierarchy: newOrgHierarcy };
      console.log('after adding', st);
      break;
    }
    case 'REMOVE_EMPLOYEE': {
      console.log('bugin', action.data);
      const newBudget = [];
      const newOrgHierarcy = st.org_hierarchy;
      st.formattedBudget.map((budget, index) => {
        if (budget.key === action.id) {
          console.log('key', budget.key, action.id);
        } else {
          newBudget.push(budget);
        }
        return index;
      });
      delete newOrgHierarcy[action.data.key];
      st = { ...state, formattedBudget: newBudget, org_hierarchy: newOrgHierarcy };
      // const addNewEmployee = st.formattedBudget;
      // addNewEmployee.push(action.data);
      // st = { ...state, formattedBudget: addNewEmployee };
      // return st;
      break;
    }
    case OrgChart.CHANGE_HIERARCHY: {
      st = { ...state, current_view: action.view };
      break;
    }
    case OrgChart.CHANGE_DATA_REPRESENTATION: {
      st = { ...state, data_representation: action.view };
      break;
    }
    case 'CHANGE_EMPLOYEE': {
      console.log('SelParent ', action.parentNodeData);
      console.log('SelParentChild ', action.selChildNodeData);
      const newOrgHierarcy = st.org_hierarchy;
      console.log(newOrgHierarcy, 'after');
      newOrgHierarcy[action.selChildNodeData.parent].children.map((child, index) => {
        if (child === action.selChildNodeData.key) {
          const element = newOrgHierarcy[action.selChildNodeData.parent].children.indexOf(child);
          if (element !== -1) {
            newOrgHierarcy[action.selChildNodeData.parent].children.splice(index, 1);
          }
        }
        return index;
      });
      newOrgHierarcy[action.parentNodeData.key].children.push(action.selChildNodeData.key);
      console.log(newOrgHierarcy, 'after');
      const overAllBudget = [];
      st.formattedBudget.map((budget, index) => {
        const tempBudget = budget;
        const currentLevelBudget = getAllChildrenBudget(budget.key, st.formattedBudget, newOrgHierarcy);
        tempBudget.budget = currentLevelBudget;
        overAllBudget.push(tempBudget);
        return index;
      });
      console.log(overAllBudget, 'overAllBudget');
      st = { ...state, formattedBudget: overAllBudget, org_hierarchy: newOrgHierarcy };
      break;
    }
    case 'ADD_NEW_EMPLOYEE': {
      st = { ...state, new_employee: action.view };
      break;
    }
    default: {
      return st;
    }
  }
  return st;
}

