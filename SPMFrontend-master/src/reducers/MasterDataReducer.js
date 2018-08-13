import { MasterType } from '../actions/ActionType';

// const masterDataObj = {
//   masterDataInformation: {
//     suffix: [{ name: 'Sr', code: 'M.D.' }, { name: 'phD', code: 'phD' }],
//     title: [{ name: 'Mr', code: 'Mr' }, { name: 'Mrs', code: 'Mrs' }, { name: 'Miss', code: 'Miss' }],
//     prefix: [{ name: 'St.', code: 'St.' }, { name: 'Saint', code: 'Saint' }],
//     gender: [{ name: 'Male', code: 'M' }, { name: 'Female', code: 'Female' }],
//     maritalStatus: [{ name: 'Single', code: 'Single' }, { name: 'Married', code: 'Married' }],
//     nationality: [{ name: 'Australian', code: 'Australian' }, { name: 'Brazilian', code: 'Brazilian' }, { name: 'Cambodian', code: 'Cambodian' }, { name: 'Indian', code: 'Indian' }],
//     prefferedLanguage: [{ name: 'Bengali', code: 'Bengali' }, { name: 'Portuguese', code: 'Portuguese' }, { name: 'Arabic', code: 'Arabic' }, { name: 'Hindi', code: 'Hindi' }],
//     ethnicGroup: [{ name: 'Assamese', code: 'Assamese' }, { name: 'Armenians', code: 'Armenians' }, { name: 'Balochis', code: 'Balochis' }, { name: 'Bamars', code: 'Bamars' }, { name: 'Belarusians', code: 'Belarusians' }],
//     veteran: [{ name: 'yes', code: 'yes' }, { name: 'no', code: 'no' }],
//     challangedVeteran: [{ name: 'yes', code: 'yes' }, { name: 'no', code: 'no' }],
//     countriesList: [{ name: 'Afghanistan', code: 'AF' }, { name: 'Åland Islands', code: 'AX' }, { name: 'Albania', code: 'AL' }],
//     addressType: [{ name: 'Mailing Address', code: 'MA' }, { name: 'Home Address', code: 'HA' }],
//     payType: [{ name: 'Cash', code: 'Cash' }, { name: 'Cheque', code: 'Cheque' }, { name: 'Money order payments', code: 'Pay' }],
//     payGroup: [{ name: 'McBitts Group', code: 'McBitts Group' }, { name: 'Consultancy Group', code: 'Consultancy Group' }],
//     payComponent: [{ name: 'Basic Pay', code: 'Basic Pay' }, { name: 'Additonal Pay', code: 'Additional Pay' }],
//     currency: [{ name: 'Rupee', code: 'Rupee' }, { name: 'USDollar', code: 'USD' }],
//     frequency: [{ name: 'Annual', code: 'Annual' }, { name: 'Monthly', code: 'Monthly' }, { name: 'Weekly', code: 'Weekly' }],
//     jobCode: [{ name: '003JA2', code: '003JA2' }, { name: '002RJ1', code: '002RJ1' }, { name: '00EAU6', code: '00EAU6' }],
//     position: [{ name: 'Manager', code: 'Manager' }, { name: 'Financial Analyst', code: 'Financial Analyst' }, { name: 'IT Project Manager Senior', code: 'IT Project Manager Senior' }],
//     company: [{ name: 'Novartis', code: 'Novartis' }, { name: 'Apple', code: 'Apple' }, { name: 'Facebook', code: 'Facebook' }],
//     businessUnit: [{ name: 'HR', code: 'HR' }, { name: 'Sales', code: 'Sales' }, { name: 'Operations', code: 'Operations' }],
//     division: [{ name: 'Production', code: 'Production' }, { name: 'R&D', code: 'R&D' }, { name: 'Marketing', code: 'Marketing' }],
//     department: [{ name: 'IT Software', code: 'IT Software' }, { name: 'Accounts', code: 'Accounts' }, { name: 'Designing', code: 'Designing' }],
//     location: [{ name: 'Australia', code: 'Australia' }, { name: 'India', code: 'India' }, { name: 'USA', code: 'USA' }],
//     timeZone: [{ name: 'IST', code: 'IST' }, { name: 'PDT', code: 'PDT' }, { name: 'GMT', code: 'GMT' }],
//     costCenter: [{ name: 'SLIS', code: 'SLIS' }, { name: 'OKB9', code: 'OKB9' }, { name: 'KP26', code: 'KP26' }],
//     employmentStatus: [{ name: 'Worker', code: 'Worker' }, { name: 'Employee', code: 'Employee' }, { name: 'Director', code: 'Director' }],
//     supervisor: [{ name: 'Analyst', code: 'Analyst' }, { name: 'Associate', code: 'Associate' }, { name: 'Coordinator', code: 'Coordinator' }],
//     jobClassification: [{ name: 'Chief Executive', code: 'Chief Executive' }, { name: 'General Manager', code: 'General Manager' }, { name: 'Operations Manager', code: 'Operations Manager' }],
//     payGrade: [{ name: 'A', code: 'A' }, { name: 'B', code: 'B' }, { name: 'C', code: 'C' }],
//     regularOrTemporary: [{ name: 'Regular', code: 'Regular' }, { name: 'Temporary', code: 'Temporary' }],
//     workSchedule: [{ name: 'Day', code: 'Day' }, { name: 'Hours', code: 'Hours' }],
//     timeProfile: [{ name: 'Hours', code: 'Hours' }, { name: 'Minutes', code: 'Minutes' }],
//     isFullTime: [{ name: 'Yes', code: 'Yes' }, { name: 'No', code: 'No' }],
//     employeeClass: [{ name: 'Temporary', code: 'Temporary' }, { name: 'Regular', code: 'Regular' }, { name: 'Intern', code: 'Intern' }],
//     flsaStatus: [{ name: 'Executive Exemption', code: 'Executive Exemption' }, { name: 'Administrative Exemption', code: 'Administrative Exemption' }, { name: 'Professional Exemption', code: 'Professional Exemption' }],
//     isShiftEmployee: [{ name: 'Yes', code: 'Yes' }, { name: 'No', code: 'No' }],
//     shiftCode: [{ name: 'SC1', code: 'SC1' }, { name: 'SC2', code: 'SC2' }],
//     isCrossBorderWorker: [{ name: 'Yes', code: 'Yes' }, { name: 'No', code: 'No' }],
//     eeoJobGroup: [{ name: 'Emergency Management Directors', code: 'Emergency Management Directors' }, { name: 'Managers', code: 'Managers' }, { name: 'All Other', code: 'All Other' }],
//     contractType: [{ name: 'Full-time', code: 'Full-time' }, { name: 'Part-time', code: 'Part-time' }, { name: 'Fixed-term', code: 'Fixed-term' }],
//     eeoCategory1: [{ name: 'Chief Executives', code: 'Chief Executives' }, { name: 'Sales Managers', code: 'Sales Managers' }],
//     eeoCategory2: [{ name: 'Technicians', code: 'Professionals' }, { name: 'Operatives', code: 'Operatives' }],
//     eeoCategory3: [{ name: 'Laborers', code: 'Laborers' }, { name: 'Service workers', code: 'Service workers' }],
//     eeoCategory4: [{ name: 'Professionals', code: 'Professionals' }, { name: 'Officials', code: 'Officials' }],
//     eeoCategory5: [{ name: 'Clerical', code: 'Clerical' }, { name: 'Craft Workers', code: 'Craft Workers' }],
//     eeoCategory6: [{ name: 'Cleaners', code: 'Cleaners' }, { name: 'Cooks', code: 'Cooks' }],
//     relationshipType: [{ name: 'HR Manager', code: 'HR Manager,' }, { name: 'Matrix Manager', code: 'Matrix Manager' }, { name: 'Additional Manager', code: 'Additional Manager' }, { name: 'Second Manager', code: 'Second Manager' }]
//   }
// };
const errorcodesData = {
  AEIDID001: { errorCode: 'AEIDID001', errorDescription: 'this error AEIDID001 description' },
  AEIDID002: { errorCode: 'AEIDID002', errorDescription: 'this error AEIDID002 description' },
  AEIDID003: { errorCode: 'AEIDID003', errorDescription: 'this error AEIDID003 description' },
  PIBIBI005: { errorCode: 'PIBIBI005', errorDescription: 'this error PIBIBI005 description' },
  PIBIBI006: { errorCode: 'PIBIBI006', errorDescription: 'this error PIBIBI006 description' },
  PIPIPI007: { errorCode: 'PIPIPI007', errorDescription: 'this error PIPIPI007 description' },
  PIPIPI008: { errorCode: 'PIPIPI008', errorDescription: 'this error PIPIPI008 description' },
  PIPIPI009: { errorCode: 'PIPIPI009', errorDescription: 'this error PIPIPI009 description' },
  PIPIPI010: { errorCode: 'PIPIPI010', errorDescription: 'this error PIPIPI010 description' },
  PIPIPI011: { errorCode: 'PIPIPI011', errorDescription: 'this error PIPIPI011 description' },
  PIPIPI012: { errorCode: 'PIPIPI012', errorDescription: 'this error PIPIPI012 description' },
  PIPIPI013: { errorCode: 'PIPIPI013', errorDescription: 'this error PIPIPI013 description' },
  PIPIPI014: { errorCode: 'PIPIPI014', errorDescription: 'this error PIPIPI014 description' },
  PINIIF015: { errorCode: 'PINIIF015', errorDescription: 'this error PINIIF015 description' },
  PINIIF016: { errorCode: 'PINIIF016', errorDescription: 'this error PINIIF016 description' },
  PINIIF017: { errorCode: 'PINIIF017', errorDescription: 'this error PINIIF017 description' },
  PINIIF018: { errorCode: 'PINIIF018', errorDescription: 'this error PINIIF018 description' },
  PIADIF019: { errorCode: 'PIADIF019', errorDescription: 'this error PIADIF019 description' },
  PIADIF020: { errorCode: 'PIADIF020', errorDescription: 'this error PIADIF020 description' },
  PIADIF021: { errorCode: 'PIADIF021', errorDescription: 'this error PIADIF021 description' },
  PIADIF022: { errorCode: 'PIADIF022', errorDescription: 'this error PIADIF022 description' },
  PIADIF023: { errorCode: 'PIADIF023', errorDescription: 'this error PIADIF023 description' },
  PIADIF024: { errorCode: 'PIADIF024', errorDescription: 'this error PIADIF024 description' },
  PIWPIF025: { errorCode: 'PIWPIF025', errorDescription: 'this error PIWPIF025 description' },
  PIWPIF026: { errorCode: 'PIWPIF026', errorDescription: 'this error PIWPIF026 description' },
  PIWPIF027: { errorCode: 'PIWPIF027', errorDescription: 'this error PIWPIF027 description' },
  PIWPIF028: { errorCode: 'PIWPIF028', errorDescription: 'this error PIWPIF028 description' },
  PIWPIF029: { errorCode: 'PIWPIF029', errorDescription: 'this error PIWPIF029 description' },
  PIWPIF030: { errorCode: 'PIWPIF030', errorDescription: 'this error PIWPIF030 description' },
  PIWPIF031: { errorCode: 'PIWPIF031', errorDescription: 'this error PIWPIF031 description' },
  PIWPIF032: { errorCode: 'PIWPIF032', errorDescription: 'this error PIWPIF032 description' },
  PIWPIF033: { errorCode: 'PIWPIF033', errorDescription: 'this error PIWPIF033 description' },
  PICIEI034: { errorCode: 'PICIEI034', errorDescription: 'this error PICIEI034 description' },
  PICIEI035: { errorCode: 'PICIEI035', errorDescription: 'this error PICIEI035 description' },
  PICIEI036: { errorCode: 'PICIEI036', errorDescription: 'this error PICIEI036 description' },
  PICIPI037: { errorCode: 'PICIPI037', errorDescription: 'this error PICIPI037 description' },
  PICIPI038: { errorCode: 'PICIPI038', errorDescription: 'this error PICIPI038 description' },
  PICIPI039: { errorCode: 'PICIPI039', errorDescription: 'this error PICIPI039 description' },
  JIEDKJ000: { errorCode: 'JIEDKJ000', errorDescription: 'This is help for Key Job Attributes' },
  JIEDKJ001: { errorCode: 'JIEDKJ001', errorDescription: 'Please select a value for Job Code' },
  JIEDKJ002: { errorCode: 'JIEDKJ002', errorDescription: 'Please select a value for Position' },
  JIEDOI000: { errorCode: 'JIEDOI000', errorDescription: 'This is help for Organisation Information' },
  JIEDOI003: { errorCode: 'JIEDOI003', errorDescription: 'Please select a value for Company ' },
  JIEDOI004: { errorCode: 'JIEDOI004', errorDescription: 'Please select a value for Business Unit' },
  JIEDOI005: { errorCode: 'JIEDOI005', errorDescription: 'Please select a value for Division' },
  JIEDOI006: { errorCode: 'JIEDOI006', errorDescription: 'Please select a value for Department' },
  JIEDOI007: { errorCode: 'JIEDOI007', errorDescription: 'Please select a value for Location' },
  JIEDOI008: { errorCode: 'JIEDOI008', errorDescription: 'Please select a value for Timezone' },
  JIEDOI009: { errorCode: 'JIEDOI009', errorDescription: 'Please select a value for Cost Center' },
  JIEDJI000: { errorCode: 'JIEDJI000', errorDescription: 'This is help for Job Information' },
  JIEDJI010: { errorCode: 'JIEDJI010', errorDescription: 'Please select a value for Employee Status' },
  JIEDJI011: { errorCode: 'JIEDJI011', errorDescription: 'Please select a value for Supervisor' },
  JIEDJI012: { errorCode: 'JIEDJI012', errorDescription: 'Please select a value for Job Classification' },
  JIEDJI013: { errorCode: 'JIEDJI013', errorDescription: 'Please enter a value for Job Title' },
  JIEDJI014: { errorCode: 'JIEDJI014', errorDescription: 'Please select a value for Pay Grade' },
  JIEDJI015: { errorCode: 'JIEDJI015', errorDescription: 'Please select a value for Regular / Temporary' },
  JIEDJI016: { errorCode: 'JIEDJI016', errorDescription: 'Please enter a value for Standard Weekly Hours' },
  JIEDTI000: { errorCode: 'JIEDTI000', errorDescription: 'This is help for Time Information' },
  JIEDTI017: { errorCode: 'JIEDTI017', errorDescription: 'Please select a value for Holiday Calendar' },
  JIEDTI018: { errorCode: 'JIEDTI018', errorDescription: 'Please select a value for Work Schedule' },
  JIEDTI019: { errorCode: 'JIEDTI019', errorDescription: 'Please select a value for Time Profile' },
  JIEDCS000: { errorCode: 'JIEDCS000', errorDescription: 'This is help for Country Specific fields' },
  JIEDCS020: { errorCode: 'JIEDCS020', errorDescription: 'Please select a value for Is Fulltime Employee' },
  JIEDCS021: { errorCode: 'JIEDCS021', errorDescription: 'Please select a value for Employee Class' },
  JIEDCS022: { errorCode: 'JIEDCS022', errorDescription: 'Please select a value for FLSA Status' },
  JIEDCS023: { errorCode: 'JIEDCS023', errorDescription: 'Please select a value for Is Shift Employee' },
  JIEDCS024: { errorCode: 'JIEDCS024', errorDescription: 'Please select a value for Shift Code' },
  JIEDCS025: { errorCode: 'JIEDCS025', errorDescription: 'Please select a value for Is Cross Border Worker' },
  JIEDCS026: { errorCode: 'JIEDCS026', errorDescription: 'Please select a value for EEO Job Group' },
  JIEDCS027: { errorCode: 'JIEDCS027', errorDescription: 'Please select a value for Contract Type' },
  JIEDCS028: { errorCode: 'JIEDCS028', errorDescription: 'Please enter a value for Continued Sickness Pay Period' },
  JIEDCS029: { errorCode: 'JIEDCS029', errorDescription: 'Please enter a value for Continued Sickness Pay Measure' },
  JIEDCS030: { errorCode: 'JIEDCS030', errorDescription: 'Please enter a value for Notice Period' },
  JIEDCS031: { errorCode: 'JIEDCS031', errorDescription: 'Please select a value for EEO Category 1' },
  JIEDCS032: { errorCode: 'JIEDCS032', errorDescription: 'Please select a value for EEO Category 2' },
  JIEDCS033: { errorCode: 'JIEDCS033', errorDescription: 'Please select a value for EEO Category 3' },
  JIEDCS034: { errorCode: 'JIEDCS034', errorDescription: 'Please select a value for EEO Category 4' },
  JIEDCS035: { errorCode: 'JIEDCS035', errorDescription: 'Please select a value for EEO Category 5' },
  JIEDCS036: { errorCode: 'JIEDCS036', errorDescription: 'Please select a value for EEO Category 6' },
  JIJRGF000: { errorCode: 'JIJRGF000', errorDescription: 'This is help for Job Relationships' },
  JIJRGF037: { errorCode: 'JIJRGF037', errorDescription: 'Please select a value for Relationship Type' },
  JIJRGF038: { errorCode: 'JIJRGF038', errorDescription: 'Please enter a value for Name' },
  JIEDGF000: { errorCode: 'JIEDGF000', errorDescription: 'This is help for Employment Details' },
  CSCICG001: { errorCode: 'CSCICG001', errorDescription: 'this error CSCICG001 description' },
  CSCICG002: { errorCode: 'CSCICG002', errorDescription: 'this error CSCICG002 description' },
  CSCICG003: { errorCode: 'CSCICG003', errorDescription: 'this error CSCICG003 description' },
  CSCICG004: { errorCode: 'CSCICG004', errorDescription: 'this error CSCICG004 description' },
  CSCICG005: { errorCode: 'CSCICG005', errorDescription: 'this error CSCICG005 description' },
  CSCICG006: { errorCode: 'CSCICG006', errorDescription: 'this error CSCICG006 description' },
  CSCICG007: { errorCode: 'CSCICG007', errorDescription: 'this error CSCICG007 description' },
  CSCICG008: { errorCode: 'CSCICG008', errorDescription: 'this error CSCICG008 description' },
  CSCICG009: { errorCode: 'CSCICG009', errorDescription: 'this error CSCICG009 description' },
  CSCICS010: { errorCode: 'CSCICS010', errorDescription: 'this error CSCICS010 description' },
  CSCICS011: { errorCode: 'CSCICS011', errorDescription: 'this error CSCICS011 description' },
  CSCICS012: { errorCode: 'CSCICS012', errorDescription: 'this error CSCICS012 description' },
  CSCICS013: { errorCode: 'CSCICS013', errorDescription: 'this error CSCICS013 description' },
  CSOPOP014: { errorCode: 'CSOPOP014', errorDescription: 'this error CSOPOP014 description' },
  CSOPOP015: { errorCode: 'CSOPOP015', errorDescription: 'this error CSOPOP015 description' },
  CSOPOP016: { errorCode: 'CSOPOP016', errorDescription: 'this error CSOPOP016 description' },
  CSRPRP018: { errorCode: 'CSRPRP018', errorDescription: 'this error CSRPRP018 description' },
  CSRPRP019: { errorCode: 'CSRPRP019', errorDescription: 'this error CSRPRP019 description' },
  CSRPRP020: { errorCode: 'CSRPRP020', errorDescription: 'this error CSRPRP020 description' }
};
const masterData =
  {
    masterDataType: {
      names: []
    }
  }
  ;
const DEFAULT_STATE = {
  currentMasterData: Object.assign([], masterData),
  // masterDataFromDB: Object.assign([], masterData)
  errorCodes: errorcodesData,
  errorCodesData: [],
  retiralBenifits: [],
  taxBenifits: [],
  swizzDeductions: [],
  swissCantons: []
};

const getMasterData = (state, action) => {
  console.log('Fetching the master data information');
  const newState = Object.assign({}, state, { currentMasterData: action.data });
  return newState;
};

const getRBByCountry = (state, action) => {
  const newState = Object.assign({}, state, { retiralBenifits: action.data });
  return newState;
};
const getTBByCountry = (state, action) => {
  const newState = Object.assign({}, state, { taxBenifits: action.data });
  return newState;
};

const getSwizzDeduction = (state, action) => {
  const newState = Object.assign({}, state, { swizzDeductions: action.data });
  return newState;
};

const getSwissCantons = (state, action) => {
  const newState = Object.assign({}, state, { swissCantons: action.data });
  return newState;
};

const getErrorCodesMasterData = (state, action) => {
  const newState = Object.assign({}, state, { errorCodesData: action.data });
  return newState;
};

const updateMasterDataLocally = (state, action) => {
  const newState = { ...state, currentMasterData: action.data };
  return newState;
};
// const getMasterData = (state) => {
//   console.log('Welcome to Master state');
//   return state;
// };

export default function reducer(state = DEFAULT_STATE, action) {
  switch (action.type) {
    case MasterType.GET_MASTER_DATA_INFO:
      return getMasterData(state, action);
    case MasterType.GET_ERROR_CODES_MASTER_DATA:
      return getErrorCodesMasterData(state, action);
    case MasterType.UPDATE_MASTER_DATA_LOCALLY:
      return updateMasterDataLocally(state, action);
    case MasterType.CREATE_MASTER_DATA_TYPE:
      return getMasterData(state, action);
    case MasterType.GET_RETIRAL_BENIFITS:
      return getRBByCountry(state, action);
    case MasterType.GET_TAX_BENIFITS:
      return getTBByCountry(state, action);
    case MasterType.GET_SWIZZ_DEDUCTIONS:
      return getSwizzDeduction(state, action);
    case MasterType.GET_SWISS_CANTONS:
      return getSwissCantons(state, action);
    default:
      return state;
  }
}
