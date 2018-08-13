import { ResumeBuilder } from '../actions/ActionType';

const initialState = {
  entityInformation: {
    employeeId: 'emp123'
  },
  profileSummary: {
    resumeTitle: '',
    displayName: '',
    firstName: 'Bhasha Sayyad',
    lastName: '',
    dob: '',
    gender: '',
    maritalStatus: '',
    profileType: '',
    experienceYears: '',
    experienceMonths: '',
    currency: '',
    ctc: '',
    videoLink: '',
    linkedIn: '',
    whatsappNumber: '',
    keepConfidential: '',
    currentLocation: '',
    currentIndustry: '',
    profileSummary: ''
  },
  contacts: {
    country: '',
    state: '',
    city: '',
    zip: '',
    Email: '',
    contacts: '',
    currentAddress: ''
  },
  educational: {
    qualification: '',
    college: '',
    year: '',
    university: '',
    percentage: '',
    qualificationDetails: ''
  }
};

const defaultState = {
  resumeBuilderData: initialState
};

const fetchDataAndAuditFromDB = (state, action) => {
  let newState = Object.assign({}, state.resumeBuilderData);
  newState = action.data[0];
  const newModifiedState = Object.assign({}, state, { resumeBuilderData: newState });
  return newModifiedState;
};

const updateResumeBuilderAndAuditData = (state, action) => {
  let newCombinedState = {};
  switch (action.data.section) {
    case 'summaryProfile': {
      const resumeBuilderDataState = Object.assign({}, state.resumeBuilderData);
      resumeBuilderDataState.profileSummary = action.data.newRows.profileSummaryData;
      newCombinedState = Object.assign({}, state, { resumeBuilderData: resumeBuilderDataState });
      console.log(newCombinedState);
      break;
    }
    default:
      return state;
  }
  return newCombinedState;
};

export default function reducer(state = defaultState, action) {
  let st = Object.assign({}, state);
  switch (action.type) {
    case ResumeBuilder.FETCH_RESUME_BUILDER_DATA_AND_AUDIT:
      st = fetchDataAndAuditFromDB(st, action);
      break;
    case ResumeBuilder.UPDATE_RESUME_BUILDER_AND_AUDIT_DATA:
      st = updateResumeBuilderAndAuditData(st, action);
      break;
    default: {
      return st;
    }
  }
  return st;
}
