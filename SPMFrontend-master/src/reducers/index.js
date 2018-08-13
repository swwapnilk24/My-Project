import { combineReducers } from 'redux';
import { localeReducer as locale } from 'react-localize-redux';
import dashboard from './DashboardReducer';
import login from './LoginReducer';
import chatbot from './ChatBotReducer';
import employee from './EmployeeReducer';
import masterData from './MasterDataReducer';
import compensationplan from './CompensationPlanReducer';
import salaryplan from './SalaryPlanReducer';
import modules from './ModuleDesignerReducer';
// import masterDataType from './MasterDataTypeReducer';
import auditTrail from './AuditTrailReducer';
import roles from './RoleReducer';
import companyData from './CompanyInfoReducer';
import leavesMasterData from './LeavesMasterDataReducer';
import resumeBuilderData from './ResumeBuilderReducer';
import performanceManagementReducer from './PerformanceManagementReducer';
import OrgchartReducer from './OrgchartReducer';
import plansReducer from './PlansReducer';
import CantonTaxes from './CantonTaxesReducer';
import prodSupport from './ProdSupportReducer';
import payRoll from './PayRollReducer';
import houseRent from './HouseRentReducer';
import publicHolidaysReducer from './PublicHolidaysReducer';
import registrationData from './RegistrationReducer';
import otherBills from './OtherBillsReducer';
import talentManagement from './TalentManagementReducer';
import employeebasednominees from './EmployeeBasedNomineesReducer';
import addNewSkills from './AddNewSkillsReducer';
import hrqueries from './HRQueriesReducer';
// import talentPool from './TalentPoolReducer';
import addNewPosition from './AddNewPositionReducer';
import adminHealthInsuranceReducer from './adminHealthInsuranceReducer';
import adminHealthInsurancePlansReducer from './adminHealthInsurancePlansReducer';
import rolesApproval from './RolesApprovalReducer';

export default combineReducers({
  locale,
  dashboard,
  login,
  chatbot,
  employee,
  masterData,
  compensationplan,
  salaryplan,
  OrgchartReducer,
  plansReducer,
  // masterDataType,
  auditTrail,
  roles,
  companyData,
  leavesMasterData,
  resumeBuilderData,
  CantonTaxes,
  prodSupport,
  payRoll,
  houseRent,
  publicHolidaysReducer,
  rolesApproval,
  registrationData,
  otherBills,
  talentManagement,
  addNewSkills,
  hrqueries,
  addNewPosition,
  employeebasednominees,
  adminHealthInsuranceReducer,
  adminHealthInsurancePlansReducer,
  performanceManagementReducer,
  modules
});
