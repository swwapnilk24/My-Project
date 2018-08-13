import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, destroy, updateEmployeeAudit, getEmployeeAuditData,getWorkerAuditData } from './controller'
import { schema } from './model'
export Audit, { schema } from './model'

const router = new Router()
const { entityInformation, identify, personalInformation, jobInformation, compensationInformation, companyInformation, publicHolidays, goalSettingScreen } = schema.tree
//const EmployeeDtls = require('./model')
/**
 * @api {post} /employees Create employee
 * @apiName CreateEmployee
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {Object} employee Employee's FirstName.
 * @apiSuccess {Object} employee Employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employee not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  //body({ identify, personalInformation, jobInformation, compensationInformation, DisplayName, FormalName, Title, BirthName, Initials, Prefix, Gender, MaritalStatus, MaritalStatusSince, SecondNationality, ThirdNationality, NativePreferredLanguage, ChallengeStatus, CertificateStartDate, CertificateEndDate, Addresses }),
  //body({employee}),
  updateEmployeeAudit)

/**
 * @api {get} /employees Retrieve employees
 * @apiName RetrieveEmployees
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} employees List of employees.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
// router.get('/',
// token({ required: false, roles: ['admin'] }),
// query(),
// index)
router.get('/', getEmployeeAuditData);

/**
 * @api {get} /employees Retrieve employees
 * @apiName RetrieveEmployees
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} employees List of employees.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
// router.get('/',
// token({ required: false, roles: ['admin'] }),
// query(),
// index)
router.get('/workers', getWorkerAuditData);

/**
 * @api {get} /employees/:id Retrieve employee
 * @apiName RetrieveEmployee
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} employee Employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employee not found.
 * @apiError 401 admin access only.
 */
// router.get('/:id', token({required: false, roles: ['admin']}), show)

/**
 * @api {delete} /employees/:id Delete employee
 * @apiName DeleteEmployee
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Employee not found.
 * @apiError 401 admin access only.
 */
// router.delete('/:id', token({required: false, roles: ['admin']}), destroy)


export default router
