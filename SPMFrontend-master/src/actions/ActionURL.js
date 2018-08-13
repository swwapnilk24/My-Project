// import { server } from '../services/config';
import AppConfig from '../config';

export const LoginUrl = {
  AUTHENTICATE: `${AppConfig.BASE_URL}auth`
};
export const ChatBotUrl = {
  CHATBOT: 'http://localhost:8099/chatbot/'
};
export const OrgChartDataURL = {
  GET_EMPLOYEES: `${AppConfig.BASE_URL}orgchart`,
  // ORGCHART_DATA: `${AppConfig.BASE_URL}orgchart`,
  ORGCHART_DATA: `${AppConfig.BASE_URL}orgchartview`,
  ADD_EMPLOYEE: `${AppConfig.BASE_URL}orgchart/addemployee`,
  ADD_NEW_EMPLOYEE: `${AppConfig.BASE_URL}orgemployee`,
  ADD_NEW_ORGHIERARCHY: `${AppConfig.BASE_URL}orghierarchy`,
  GET_RATINGS: `${AppConfig.BASE_URL}ratings`,
  COMP_SIMULATION: `${AppConfig.BASE_URL}simulationversions`,
  GET_MERIT_GUIDELINES: `${AppConfig.BASE_URL}meritguidelines`
};
export const SalaryPlanUrl = {
  GET_SALARYPLAN: `${AppConfig.BASE_URL}compensationplans`,
  GET_STI: `${AppConfig.BASE_URL}shorttermincentives`,
  GET_EMPLOYEES: `${AppConfig.BASE_URL}employee`,
  GET_MERIT_GUIDELINES: `${AppConfig.BASE_URL}meritguidelines`,
  GET_EMPLOYEE_BANDS: `${AppConfig.BASE_URL}employeeband`,
  GET_TARGETS: `${AppConfig.BASE_URL}employeetargets`,
  GET_COMPENSATION_PLANNING: `${AppConfig.BASE_URL}compensationplanning`,
  GET_COMPENSATION_PLANNING_STATUS: `${AppConfig.BASE_URL}compensationplanstatus`,
  ADD_SALARY_PLAN: `${AppConfig.BASE_URL}compensationplans`,
  GET_EMPLOYESS_BY_BAND: `${AppConfig.BASE_URL}employee/getEmployeesByBand/`
};
export const MasterDataTypeUrl = {
  CREATE_MASTERDATATYPE: `${AppConfig.BASE_URL}master`
};
export const initialCheckForFullUpload = {
  INITIAL_CHECK_FOR_FULL_UPLOAD: `${AppConfig.BASE_URL}master/initialCheckForFullUpload`
};
export const partialMasterDataUpload = {
  PARTIAL_MASTER_DATA_UPLOAD: `${AppConfig.BASE_URL}master/updateDocuments`
};
export const emptyMasterDataCollection = {
  EMPTY_MASTER_DATA_COLLECTION: `${AppConfig.BASE_URL}master/emptyCollection`
};
export const replaceAndUpdateDocument = {
  REPLACE_EXISTING_DOCUMENT: `${AppConfig.BASE_URL}master/updateDocument`
};
export const deleteDocument = {
  DELETE_DOCUMENT: `${AppConfig.BASE_URL}master/deleteDocument`
};
export const checkForInsert = {
  CHECK_FOR_INSERT: `${AppConfig.BASE_URL}master/checkForInsert`
};
export const EmployeeUrl = {
  EmployeeUrl: `${AppConfig.BASE_URL}employees/myEmployees`,
  CREATE_NEW_EMPLOYEE: `${AppConfig.BASE_URL}employees/new`,
  VALIDATE_LOGIN: `${AppConfig.BASE_URL}employees/login`
};
export const CompanyActionUrl = {
  Fetch_From_DB: `${AppConfig.BASE_URL}companies/`,
  SEND_COMPANY_DATA: `${AppConfig.BASE_URL}companies`,
  FETCH_COMPANY_AUDIT: `${AppConfig.BASE_URL}companyaudit/showCompanyAudit`,
  SEND_COMPANY_AUDIT: `${AppConfig.BASE_URL}companyaudit`,
  FIND_COMPANY: `${AppConfig.BASE_URL}companies/findCompany`,
  CREATE_COMPANY: `${AppConfig.BASE_URL}companies/new`,
  EMAIL_AUTH_URL: `${AppConfig.BASE_URL}companies/emailauth`
};
export const PerformanceManagementUrl = {
  PerformanceManagementUrl: `${AppConfig.BASE_URL}PerformanceManagement`
};

export const PublicHolidaysUrl = {
  PublicHolidaysUrl: `${AppConfig.BASE_URL}publicholidays`
};

export const ResumeBuilderUrl = {
  FETCH_FROM_DB: `${AppConfig.BASE_URL}resumeBuilder/`,
  SEND_RESUME_BUILDER_DATA_AND_AUDIT: `${AppConfig.BASE_URL}resumeBuilder`,
  UPDATE_PROFILE_SUMMARY_DATA: `${AppConfig.BASE_URL}resumeBuilder/updateProfileSummary/`,
  UPDATE_CONTACTS_DATA: `${AppConfig.BASE_URL}resumeBuilder/updateContacts/`
};

export const BandsAndPlans = {
  GET_PLANS: `${AppConfig.BASE_URL}bandsandplan`,
  GET_BANDS: `${AppConfig.BASE_URL}employeeband`,
  TARGET_PLANS: `${AppConfig.BASE_URL}targetplans`,
  BANDS_APPLICABLE_PLANS: `${AppConfig.BASE_URL}bands_applicable_plans`
};

export const CantonTaxesUrl = {
  SAVE_TO_DB: `${AppConfig.BASE_URL}cantontaxes`,
  FETCH_FROM_DB: `${AppConfig.BASE_URL}cantontaxes`,
  FETCH_FOR_ALL: `${AppConfig.BASE_URL}cantontaxes/showAll`,
  DELETE_ROW: `${AppConfig.BASE_URL}cantontaxes/delete`,
  CHECK_FOR_INSERT: `${AppConfig.BASE_URL}cantontaxes/checkForInsert`,
  UPDATE_ON_EDIT: `${AppConfig.BASE_URL}cantontaxes/update`,
  CHECK_FOR_INITIAL_FULL_UPLOAD: `${AppConfig.BASE_URL}cantontaxes/checkForInitialFullUpload`
};
export const ProdSupportURL = {
  PROD_SUPPORT_URL: `${AppConfig.BASE_URL}productionsupport`
};

export const RegistrationURL = {
  REGISTRATION_URL: `${AppConfig.BASE_URL}roles`,
  VALIDATE_LOGIN: `${AppConfig.BASE_URL}roles/verify`,
  // ADD_USER_URL: `${AppConfig.BASE_URL}appuser`
  ADD_USER_URL: 'http://localhost:9000/appuser'
};

export const HRQueriesURL = {
  HR_QUERIES_URL: `${AppConfig.BASE_URL}hrqueries`
};

export const RolesApprovalUrl = {
  RolesApprovalUrl: `${AppConfig.BASE_URL}rolesapproval`
};

export const EmployeeBasedNomineesURL = {
  FETCH_NOMINEES: `${AppConfig.BASE_URL}employees/nominee/`,
  DELETE_NOMINEES: `${AppConfig.BASE_URL}employees/nominee/`,
  SAVE_NOMINEES: `${AppConfig.BASE_URL}employees/nominee/`,
  FETCH_EMPLOYEE_PLAN_DATA: `${AppConfig.BASE_URL}healthInsuranceBenefits/planDataForEmployee/`
};

export const LeavesCalcURL = {
  LEAVES_PAYROLL_URL: `${AppConfig.BASE_URL}leavescalc/leaveByEmpId/`
};

export const AdminHealthInsuraceUrl = {
  FETCH_HEALTH_BENEFITS: `${AppConfig.BASE_URL}healthInsuranceBenefits/`,
  UPDATE_HEALTH_BENEFITS: `${AppConfig.BASE_URL}healthInsuranceBenefits/`,
  DELETE_HEALTH_BENEFITS: `${AppConfig.BASE_URL}healthInsuranceBenefits/`,
  FETCH_HEALTH_INSURANCE_PLANS: `${AppConfig.BASE_URL}healthInsuranceplans/showplans/`
};

export const AdminHealthInsuracePlansUrl = {
  FETCH_HEALTH_BENEFITS: `${AppConfig.BASE_URL}healthInsurancePlans/`,
  UPDATE_HEALTH_BENEFITS: `${AppConfig.BASE_URL}healthInsurancePlans/`,
  DELETE_HEALTH_BENEFITS: `${AppConfig.BASE_URL}healthInsurancePlans/`
};

export const UserUrl = {
  CREATE_USER: `${AppConfig.BASE_URL}usersData`
};
