import { AuditType } from '../actions/ActionType';
import { BenefitsType } from '../components/Benefits/BenefitsConstants';

const auditData = {
  entityInformation: {
    owner: 'Mcbitss17',
    approver: '',
    status: 'active',
    employeeId: 'something',
    customer: 'McBitss',
    approval_date: new Date()
  },
  identify: {
    identify: {
      identify: {
        hireDate: '',
        company: '',
        eventReason: ''
      }
    }
  },
  personalInformation: {
    biographicalInformation: {
      biographicalInformation: []
    },
    personalInformation: {
      personalInformation: [],
      countrySpecificFields: {
        us: []
      }

    },
    nationalIdInformation: [],
    addressInformation: {
      addressInformation: []
    },
    workPermitInformation: {
      workPermitInformation: []
    },
    contactInformation: {
      emailInformation: [],
      phoneInformation: []
    },
    emergencyContactDetails: {
      emergencyContactDetails: []
    },
    educationalInformation: {
      educationalInformation: []
    },
    priorWorkExperienceDetails: {
      priorWorkExperienceDetails: []
    }
  },
  jobInformation: {
    employmentDetail: {
      keyJobAttribute: [],
      organizationalInformation: [],
      jobInformation: [],
      timeInformation: [],
      countrySpecificFields: {
        us: []
      }
    },
    jobRelationships: {
      globalFields: []
    },
    employmentDetails: {
      globalFields: []
    }
  },
  compensationInformation: {
    compensationInformation: {
      compensationGroup: [],
      compensation: []
    },
    oneTimePayment: {
      oneTimePayment: []
    },
    recurringPayment: {
      recurringPayment: []
    }
  },
  companyInformation: {
    companyInformation: [],
    addressInformation: {
      addressInformation: []
    }
  },
  benefits: {
    currentBenefits: {
      allowance: [],
      others: []
    },
    claims: {
      inprocessClaims: [],
      processedClaims: []
    }
  },
  createdBy: {
    createdBy: 'Bhasha'
  }
};

const leavesAudit = {
  id: '',
  leavesAudit: []
};

const publicHolidaysAudit = {
  publicHolidaysAudit: [{
    company: '',
    country: '',
    holidayDescription: '',
    date: '',
    createdBy: '',
    createdDate: ''
  }]
};

const performanceManagementAudit = {
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
  }
};

const initialState = {
  currentEmployee: { ...auditData },
  workerAuditData: [],
  leavesAudit: { ...leavesAudit },
  publicHolidaysAudit: { ...publicHolidaysAudit },
  performanceManagementAudit: { ...performanceManagementAudit }
};

const setAuditData = (state, action) => {
  console.log('Auditing', action.data);
  const newCurrentEmployeeState = { ...state.currentEmployee };
  let flag = true;
  const newObj = {};
  newObj.operation = action.data.operation;
  action.data.field.forEach((element, index) => {
    const fieldArr = element.split('_');
    const step = fieldArr[0];
    const section = fieldArr[1];
    const subSection = fieldArr[2];
    const field = fieldArr[3];
    console.log('Adding a value at ', step, section, subSection, field);
    if (subSection === 'countrySpecificFields') {
      const country = field;
      const countryField = fieldArr[4];
      if (flag) {
        console.log('setting flag for country specific', index);
        // const newObj = {};
        // newObj.operation = action.data.operation;
        newCurrentEmployeeState[step][section][subSection][country].push(newObj);
        flag = false;
      }
      const rowIndex = newCurrentEmployeeState[step][section][subSection][country].length;
      const addIndex = rowIndex - 1;
      newCurrentEmployeeState[step][section][subSection][country][addIndex][countryField] = action.data.value[index];
    } else {
      if (flag) {
        console.log('setting flag', index);
        newCurrentEmployeeState[step][section][subSection].push(newObj);
        flag = false;
      }
      const rowIndex = newCurrentEmployeeState[step][section][subSection].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
    }
  });
  const newState = { ...state, currentEmployee: newCurrentEmployeeState };
  return newState;
};
/* To insert Audit Data for benefits.
*/
const insertAuditForBenefits = (state, action) => {
  console.log('Auditing', action.data);
  const newCurrentEmployeeState = { ...state.currentEmployee };
  let flag = true;
  const newObj = {};
  newObj.operation = action.data.operation;
  newObj.insertedBy = action.data.insertedBy;
  newObj.insertedDate = new Date();
  action.data.field.forEach((element, index) => {
    const fieldArr = element.split('_');
    const step = fieldArr[0];
    const section = fieldArr[1];
    const subSection = fieldArr[2];
    let field = fieldArr[3];
    console.log('Adding a value at ', step, section, subSection, field);

    if (flag) {
      if (section === BenefitsType.ENROLLMENTS_SECTION) {
        console.log('setting flag', index);
        newCurrentEmployeeState[step][section].push(newObj);
      } else {
        console.log('setting flag', index);
        newCurrentEmployeeState[step][section][subSection].push(newObj);
      }
      flag = false;
    }
    //Checking for inserting data
    if (section === BenefitsType.ENROLLMENTS_SECTION) {
      const rowIndex = newCurrentEmployeeState[step][section].length;
      const addIndex = rowIndex - 1;
      field = subSection;
      console.log('Adding a new value at index', rowIndex);
      newCurrentEmployeeState[step][section][addIndex][field] = action.data.value[index];
    } else {
      const rowIndex = newCurrentEmployeeState[step][section][subSection].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
    }
  });
  const newState = { ...state, currentEmployee: newCurrentEmployeeState };
  return newState;
};
const auditDataForPersonalInfo = (state, action) => {
  console.log('Auditing', action.data);
  const newCurrentEmployeeState = { ...state.currentEmployee };
  let flag = true;
  action.data.field.forEach((element, index) => {
    const fieldArr = element.split('_');
    const step = fieldArr[0];
    const section = fieldArr[1];
    const subSection = fieldArr[2];
    const field = fieldArr[3];
    console.log('Adding a value at ', step, section, subSection, field);
    if (subSection === 'countrySpecificFields') {
      const country = field;
      const countryField = fieldArr[4];
      if (flag) {
        console.log('setting flag for country specific', index);
        newCurrentEmployeeState[step][section][subSection][country].push({});
        flag = false;
      }
      const rowIndex = newCurrentEmployeeState[step][section][subSection][country].length;
      const addIndex = rowIndex - 1;
      newCurrentEmployeeState[step][section][subSection][country][addIndex][countryField] = action.data.value[index];
    } else if (section === 'nationalIdInformation') {
      if (flag) {
        console.log('setting flag', index);
        newCurrentEmployeeState[step][section].push({});
        flag = false;
      }
      const rowIndex = newCurrentEmployeeState[step][section].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newCurrentEmployeeState[step][section][addIndex][subSection] = action.data.value[index];
      console.log(action.data.value);
      console.log('Adding a new value to newCurrentEmployeeState', newCurrentEmployeeState);
    } else {
      if (flag) {
        console.log('setting flag', index);
        newCurrentEmployeeState[step][section][subSection].push({});
        flag = false;
      }
      const rowIndex = newCurrentEmployeeState[step][section][subSection].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newCurrentEmployeeState[step][section][subSection][addIndex][field] = action.data.value[index];
      console.log(action.data.value);
      console.log('Adding a new value to newCurrentEmployeeState', newCurrentEmployeeState);
    }
  });
  console.log(newCurrentEmployeeState);
  const newState = { ...state, currentEmployee: newCurrentEmployeeState };
  console.log(newState);
  return newState;
};

const updateAuditData = (state, action) => {
  let newAuditState = { ...state.currentEmployee };
  newAuditState = action.data;
  console.log('shree');
  const updatedAuditState = { ...state, currentEmployee: newAuditState };
  return updatedAuditState;
};

const updateWorkerAuditData = (state, action) => {
  let newAuditState = { ...state.currentEmployee };
  newAuditState = action.data;
  console.log('shree');
  const updatedAuditState = { ...state, workerAuditData: newAuditState };
  return updatedAuditState;
};
const updateAuditForCompensation = (state, action) => {
  const newCurrentEmployeeState = { ...state.currentEmployee };
  const newData = action.data.newData;
  newData.insertedBy = 'basha';
  newData.insertedDate = new Date();
  if (action.data.subsection === 'compensation') {
    // console.log('updateCurrentEmployeeData');
    // console.log(action);
    // alert('compensation');
    newCurrentEmployeeState.compensationInformation.compensationInformation.compensation.push(newData);
  }
  if (action.data.subsection === 'oneTimePayment') {
    // alert('oneTimePayment');
    newCurrentEmployeeState.compensationInformation.oneTimePayment.oneTimePayment.push(newData);
  }
  if (action.data.subsection === 'recurringPayment') {
    // alert('recurringPayment');
    newCurrentEmployeeState.compensationInformation.recurringPayment.recurringPayment.push(newData);
  }
  if (action.data.subsection === 'compensationGroup') {
    // alert('compensationGroup');
    newCurrentEmployeeState.compensationInformation.compensationInformation.compensationGroup.push(newData);
  }
  const updatedAuditState = { ...state, currentEmployee: newCurrentEmployeeState };
  return updatedAuditState;
};

export const insertIntoLeavesAudit = (state, action) => {
  const newLeavesState = { ...state.leavesAudit };
  // const finalData = action.data.newData;
  // finalData.insertedBy = action.data.insertedBy;
  // finalData.insertedDate = action.data.insertedDate;
  // finalData.operation = action.data.operation;
  console.log(newLeavesState);
  newLeavesState.leavesAudit.push(action.data);
  console.log(newLeavesState);
  const finalState = { ...state, leavesAudit: newLeavesState };
  return finalState;
};

export const updateLeavesAudit = (state, action) => {
  let newLeavesState = { ...state.leavesAudit };
  newLeavesState = action.data;
  const finalState = { ...state, leavesAudit: newLeavesState };
  return finalState;
};

const updatePublicHolidaysAudit = (state, action) => {
  console.log('Auditing', action.data);
  const newPublicHolidaysState = { ...state.currentEmployee };
  let flag = true;
  action.data.field.forEach((element, index) => {
    const fieldArr = element.split('_');
    const step = fieldArr[0];
    const section = fieldArr[1];
    const subSection = fieldArr[2];
    const field = fieldArr[3];
    console.log('Adding a value at ', step, section, subSection, field);
    if (subSection === 'countrySpecificFields') {
      const country = field;
      const countryField = fieldArr[4];
      if (flag) {
        console.log('setting flag for country specific', index);
        newPublicHolidaysState[step][section][subSection][country].push({});
        flag = false;
      }
      const rowIndex = newPublicHolidaysState[step][section][subSection][country].length;
      const addIndex = rowIndex - 1;
      newPublicHolidaysState[step][section][subSection][country][addIndex][countryField] = action.data.value[index];
    } else if (step === 'publicHolidays') {
      if (flag) {
        console.log('setting flag', index);
        newPublicHolidaysState[step].push({});
        flag = false;
      }
      const rowIndex = newPublicHolidaysState[step].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newPublicHolidaysState[step][addIndex][section] = action.data.value[index];
      console.log(action.data.value);
      console.log('Adding a new value to newPublicHolidaysState', newPublicHolidaysState);
    } else {
      if (flag) {
        console.log('setting flag', index);
        newPublicHolidaysState[step][section][subSection].push({});
        flag = false;
      }
      const rowIndex = newPublicHolidaysState[step][section][subSection].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newPublicHolidaysState[step][section][subSection][addIndex][field] = action.data.value[index];
      console.log(action.data.value);
      console.log('Adding a new value to newPublicHolidaysState', newPublicHolidaysState);
    }
  });
  console.log(newPublicHolidaysState);
  const newState = { ...state, publicHolidaysAudit: newPublicHolidaysState };
  console.log(newState);
  return newState;
};

const updatePerformanceManagementAuditData = (state, action) => {
  console.log('Auditing', action.data);
  const newPerformanceManagementState = { ...state.currentEmployee };
  console.log(newPerformanceManagementState);
  let flag = true;
  action.data.field.forEach((element, index) => {
    const fieldArr = element.split('_');
    const step = fieldArr[0];
    const section = fieldArr[1];
    const field = fieldArr[2];
    console.log('Adding a value at ', step, section, field);
    if (section === 'countrySpecificFields') {
      const country = field;
      const countryField = fieldArr[4];
      if (flag) {
        console.log('setting flag for country specific', index);
        newPerformanceManagementState[step][section][country].push({});
        flag = false;
      }
      const rowIndex = newPerformanceManagementState[step][section][country].length;
      const addIndex = rowIndex - 1;
      newPerformanceManagementState[step][section][country][addIndex][countryField] = action.data.value[index];
    } else if (step === 'publicHolidays') {
      if (flag) {
        console.log('setting flag', index);
        newPerformanceManagementState[step].push({});
        flag = false;
      }
      const rowIndex = newPerformanceManagementState[step].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newPerformanceManagementState[step][addIndex][section] = action.data.value[index];
      console.log(action.data.value);
      console.log('Adding a new value to newPerformanceManagementState', newPerformanceManagementState);
    } else {
      if (flag) {
        console.log('setting flag', index);
        newPerformanceManagementState[step][section].push({});
        flag = false;
      }
      const rowIndex = newPerformanceManagementState[step][section].length;
      const addIndex = rowIndex - 1;
      console.log('Adding a new value at index', rowIndex);
      newPerformanceManagementState[step][section][addIndex][field] = action.data.value[index];
      console.log(action.data.value);
      console.log('Adding a new value to newPerformanceManagementState', newPerformanceManagementState);
    }
  });
  console.log(newPerformanceManagementState);
  const newState = { ...state, performanceManagementAudit: newPerformanceManagementState };
  console.log(newState);
  return newState;
};

export default function reducer(state = initialState, action) {
  // console.log('Is in Audit Reducer');
  switch (action.type) {
    case AuditType.INSERT_INTO_AUDIT:
      return setAuditData(state, action);

    case AuditType.INSERT_INTO_AUDIT_FOR_PERSONAL_INFO:
      return auditDataForPersonalInfo(state, action);

    case AuditType.UPDATE_AUDIT_DATA:
      return updateAuditData(state, action);

    case AuditType.AUDIT_UPDATE_FOR_COMPENSATION:
      return updateAuditForCompensation(state, action);

    case AuditType.UPDATE_WORKER_AUDIT_DATA:
      return updateWorkerAuditData(state, action);

    case AuditType.INSERT_AUDIT_FOR_BENEFITS:
      return insertAuditForBenefits(state, action);

    case AuditType.INSERT_INTO_LEAVES_AUDIT:
      return insertIntoLeavesAudit(state, action);

    case AuditType.UPDATE_LEAVES_AUDIT:
      return updateLeavesAudit(state, action);

    case AuditType.UPDATE_PUBLIC_HOLIDAYS_AUDIT:
      return updatePublicHolidaysAudit(state, action);

    case AuditType.UPDATE_PERFORMANCE_MANAGEMENT_AUDIT:
      return updatePerformanceManagementAuditData(state, action);

    default:
      return state;
  }
}
