import { PerformanceManagementType } from '../actions/ActionType';

const performanceManagementTypeObj = {
  goalSettingScreen: {
    individualGoals: [{
      goalText: '',
      startDate: '',
      endDate: '',
      expectedOutcome: '',
      addedBy: '',
      weightage: '',
      performanceYear: '2017-2018',
      performanceRating: '',
      comments: '',
      managerRating: '',
      managerComments: ''
    }],
    knowledgeManagement: [{
      goalText: '',
      startDate: '',
      endDate: '',
      expectedOutcome: '',
      addedBy: '',
      weightage: '',
      performanceYear: '2017-2018',
      performanceRating: '',
      comments: '',
      managerRating: '',
      managerComments: ''
    }]
  },
  goalApproval: [{
    approvalBymanager: ''
  }],
  appraisals: [{
    displayGoals: '',
    selfEvaluation: '',
    selfEvaluationRating: ''
  }],
  appraiser: [{
    displayGoals: '',
    selfEvaluationText: '',
    selfEvaluationRating: '',
    appraiserComments: '',
    appraiserRating: ''
  }],
  normalisationProcess: [{
    tbd: ''
  }]
};

const initialState = {
  performanceManagementInfo: Object.assign({}, performanceManagementTypeObj)
};

const performanceManagementData = (state, action) => {
  console.log('MenuMaster', action.data);
  console.log('MenuMaster', state);
  const newState = {};
  Object.assign(newState, state, { performanceManagementInfo: action.data[0] });
  console.log('bugin', newState);
  return newState;
};

const updatePerformanceManagementData = (state, action) => {
  console.log(state, action.data);
  const newPerformanceManagementData = {};
  Object.assign(newPerformanceManagementData, state.performanceManagementInfo);
  console.log(newPerformanceManagementData);
  if (action.data.type === 'add') {
    let flag = true;
    action.data.field.forEach((element, index) => {
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      const field = fieldArr[2];
      console.log(step);
      console.log(section);
      console.log(field);
      if (flag) {
        if (step === 'goalSettingScreen') {
          console.log(newPerformanceManagementData[step][section]);
          newPerformanceManagementData[step][section].push({});
          flag = false;
        } else if (section === 'addressInformation' || section === 'workPermitInformation') {
          console.log(step);
          console.log(section);
          newPerformanceManagementData[step][section].push({});
          flag = false;
        } else {
          console.log(step);
          console.log(section);
          newPerformanceManagementData[step][section].push({});
          flag = false;
        }
      }
      if (step === 'goalSettingScreen') {
        const rowIndex = newPerformanceManagementData[step][section].length;
        const addIndex = rowIndex - 1;
        console.log('KeyJobAttribute length is', typeof rowIndex);
        console.log('printing field array', section, addIndex, field);
        newPerformanceManagementData[step][section][addIndex][field] = action.data.value[index];
        console.log('Value:', action.data.value);
        // console.log('your new value updated', newPerformanceManagementData[section][addIndex][field]);
      }
    });
  } if (action.data.type === 'edit') {
    action.data.field.forEach((element, index) => {
      console.log(action.data);
      console.log('test', newPerformanceManagementData);
      const fieldArr = element.split('_');
      const step = fieldArr[0];
      const section = fieldArr[1];
      const field = fieldArr[2];
      console.log(step);
      console.log(section);
      console.log(field);
      if (section === 'personalInformation' || section === 'biographicalInformation') {
        console.log(action.data);
        newPerformanceManagementData[step][section][field] = action.data.value[index];
      } else if (section === 'countrySpecificFields') {
        const country = field;
        const countryField = fieldArr[4];
        newPerformanceManagementData[step][section][section][country][countryField] = action.data.value[index];
      } else if ((step === 'goalSettingScreen')) {
        // newPerformanceManagementData[step][section];
        newPerformanceManagementData[step][section][action.data.id][field] = action.data.value[index];
        // newPerformanceManagementData[step][section];
        console.log('Value:', action.data.value);
        console.log('value after edit', newPerformanceManagementData[step][section]);
      } else {
        console.log('printing field array', step, section, action.data.id, section);
        console.log(newPerformanceManagementData[step][section]);
        newPerformanceManagementData[step][section].reverse();
        newPerformanceManagementData[step][section][action.data.id][field] = action.data.value[index];
        newPerformanceManagementData[step][section].reverse();
        console.log(newPerformanceManagementData[step][section]);
        console.log('Value:', action.data.value);
      }
    });
  }
  const newState = {};
  Object.assign(newState, state, { performanceManagementInfo: newPerformanceManagementData });
  console.log(newState);
  return newState;
};

export default function reducer(state = initialState, action) {
  // const st = state;
  switch (action.type) {
    case PerformanceManagementType.GET_PERFORMANCE_MANAGEMENT_DATA:
      return performanceManagementData(state, action);
    case PerformanceManagementType.UPDATE_PERFORMANCE_MANAGEMENT_DATA:
      return updatePerformanceManagementData(state, action);
    default:
      return state;
  }
}
