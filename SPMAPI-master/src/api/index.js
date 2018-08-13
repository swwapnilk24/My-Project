import { Router } from 'express'
import user from './user'
import auth from './auth'
import passwordReset from './password-reset'
import company from './company'
import role from './role'
import employee from './employee'
import orgemployee from './orgemployee'
import chatbot from './chatbot'
import master from './master'
import mastervalues from './mastervalues'
import clientinfo from './clientinfo'
import audit from './audit'
import TempEmployee from './tempemployee';
import ErrorCodesMasterData from './ErrorCodesMasterData';
import AutoIncTempEmp from './autoinctempemp';
import CompanyAudit from './companyAudit';
import ResumeBuilder from './resumeBuilder';
import leavesMaster from './leaves-master';
import leavesIndividual from './leaves-individual';
import MenuMaster from './menumaster';
import MenuMappingInfo from './menumappinginfo';
import RoleMaster from './rolemaster';
import PerformanceManagement from './performanceManagement';
import leavesAudit from './leaves-audit';
import meritgroup from './meritgroup'
import bandsandplan from './bandsandplans'
import bands_applicable_plans from './bands_applicable_plans'
import targetplans from './targetplans'
import compensationplan from './compensationplan'
import compensationplanning from './compensationplanning'
import orgchart from './orgchart'
import countries from './countries'
import employeetargets from './employeetargets'
import divisions from './divisions'
import oplevels from './oplevels'
import meritguidelines from './meritguidelines'
import headcount from './headcount'
import budget from './budget'
import actualspent from './actualspent'
import shorttermincentives from './shorttermincentives'
import orgchartview from './orgchartview'
import ratings from './ratings'
import compensationplanstatus from './compensationplanstatus'
import orghierarchy from './orghierarchy'
import simulationversions from './simulationversions'
import nominationplan from './nominationplan'
import employeeband from './employeeband'
import cantonTaxes from './cantontaxes'
import productionsupport from './productionsupport'
import PublicHolidays from './publicholidays';
import registration from './registration'
import appuser from './appuser'
import retiralbenifits from './retiralbenifits'
import leavescalc from './leavescalc'
import employeeBasednominees from './employeeBasednominees';
import taxbenifit from './taxbenifit'
import hrqueries from './hrqueries'
import companyCounter from './company-counter'
import swizzdeductions from './swizzdeductions'
import swisspayroll from './swisspayroll'
import swisscontons from './swisscontons'
import HealthInsuranceBenefits from  './HealthInsurance';
import HealthInsurancePlans from './HealthInsurancePlans';
import companySubscription from './company-subscription';
import RolesApproval from './rolesApproval';
import swisscompensation from './swisscompensation'
// import regTokens from './registration-tokens';
// import leavecalculation from './leavecalculation'

const router = new Router()

/**
 * @apiDefine master Master access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine admin Admin access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine user User access only
 * You must pass `access_token` parameter or a Bearer Token authorization header
 * to access this endpoint.
 */
/**
 * @apiDefine listParams
 * @apiParam {String} [q] Query to search.
 * @apiParam {Number{1..30}} [page=1] Page number.
 * @apiParam {Number{1..100}} [limit=30] Amount of returned items.
 * @apiParam {String[]} [sort=-createdAt] Order of returned items.
 * @apiParam {String[]} [fields] Fields to be returned.
 */
router.use('/usersData', user)
router.use('/auth', auth)
router.use('/chatbot', chatbot)
router.use('/password-resets', passwordReset)
router.use('/companies', company)
router.use('/roles', role)
router.use('/employees', employee)
router.use('/employees/updateNewEmployee', employee)
router.use('/employees/findNewEmployee', employee)
router.use('/master', master)
router.use('/mastervalues', mastervalues)
router.use('/chatbot', chatbot)
router.use('/meritgroups', meritgroup)
router.use('/compensationplans', compensationplan)
router.use('/clientinfo', clientinfo)
router.use('/audit', audit)
router.use('/tempemployees', TempEmployee);
router.use('/errorcodesmaster', ErrorCodesMasterData);
router.use('/autoIncrementTempEmp', AutoIncTempEmp);
router.use('/companyaudit', CompanyAudit);
router.use('/resumeBuilder', ResumeBuilder);
router.use('/leavesMaster', leavesMaster);
router.use('/leavesIndividual', leavesIndividual);
router.use('/menuMaster', MenuMaster);
router.use('/menuMapping', MenuMappingInfo);
router.use('/roleMaster', RoleMaster);
router.use('/performanceManagement', PerformanceManagement);
router.use('/leavesAudit', leavesAudit);
router.use('/publicholidays', PublicHolidays);
router.use('/rolesapproval', RolesApproval);
router.use('/companycounter', companyCounter);
//from ecomp
router.use('/meritgroups', meritgroup)
router.use('/bandsandplan', bandsandplan)
router.use('/bands_applicable_plans', bands_applicable_plans)
router.use('/targetplans', targetplans)
router.use('/compensationplans', compensationplan)
router.use('/countries', countries)
router.use('/divisions', divisions)
router.use('/oplevels', oplevels)
router.use('/budget', budget)
router.use('/ratings', ratings)
router.use('/actualspent', actualspent)
router.use('/orgchart', orgchart)
router.use('/headcount', headcount)
router.use('/shorttermincentives', shorttermincentives)
router.use('/employeeband', employeeband)
router.use('/meritguidelines', meritguidelines)
router.use('/employeetargets', employeetargets)
router.use('/compensationplanning', compensationplanning)
router.use('/orgchartview', orgchartview)
router.use('/orghierarchy', orghierarchy)
router.use('/compensationplanstatus', compensationplanstatus)
router.use('/simulationversions', simulationversions)
router.use('/nominationplan', nominationplan)
router.use('/orgemployee', orgemployee)
router.use('/cantontaxes', cantonTaxes);
router.use('/productionsupport', productionsupport)
router.use('/registration', registration)
router.use('/appuser', appuser)
router.use('/retiralbenifits', retiralbenifits)
router.use('/leavescalc', leavescalc)
router.use('/employeeBasednominees', employeeBasednominees)
router.use('/taxbenifit', taxbenifit)
router.use('/hrqueries', hrqueries)
router.use('/swizzdeductions', swizzdeductions)
router.use('/swisspayroll', swisspayroll)
router.use('/swisscontons', swisscontons)
router.use('/healthInsuranceBenefits', HealthInsuranceBenefits);
router.use('/healthInsurancePlans', HealthInsurancePlans);
router.use('/companysubscription', companySubscription);
router.use('/swisscompensation', swisscompensation);

export default router
