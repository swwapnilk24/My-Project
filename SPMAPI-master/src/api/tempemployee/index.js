import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, updateNewEmployee, findNewEmployee, showEmpData, getLastEmployeeData, listOfMyEmployees, getFirstRecordData } from './controller'
import { schema } from './model'
export Employee, { schema } from './model'

const router = new Router()
const { employee } = schema.tree
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
  create)

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
router.get('/',
token({ required: false, roles: ['admin'] }),
query(),
index)

/**
 * @api {get} /employees/getLastEmpCode Retrieve employee
 * @apiName RetrieveEmployee
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} employee Employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employee not found.
 * @apiError 401 admin access only.
 */
router.get('/getLastEmployeeData',
token({ required: false, roles: ['admin'] }),
query(),
getLastEmployeeData)

/**
 * @api {get} /employees/firstRecord Retrieve employee
 * @apiName RetrieveEmployee
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} employee Employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employee not found.
 * @apiError 401 admin access only.
 */
router.get('/firstRecord/:id',token({ required: false, roles: ['admin'] }),
query(),
getFirstRecordData)

/**
 * @api {get} /employees/myEmployees Retrieve myEmployees
 * @apiName RetrieveMyEmployees
 * @apiGroup MyEmployees
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} employee Employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 MyEmployees not found.
 * @apiError 401 admin access only.
 */
router.get('/myEmployees',
token({ required: false, roles: ['admin'] }),
query(),
listOfMyEmployees)

/**
 * @api {get} /employees/getCurrentEmployeeData Retrieve employees
 * @apiName RetrieveEmployees
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} employees List of employees.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/getCurrentEmployeeData',
  token({ required: false, roles: ['admin'] }),
  query(),
  showEmpData)

/**
 * @api {get} /employees/updateNewEmployee Retrieve employees
 * @apiName RetrieveEmployees
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} employees List of employees.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.post('/updateNewEmployee',
    token({ required: false, roles: ['admin'] }),
    updateNewEmployee)

/**
 * @api {get} /employees/updateNewEmployee Retrieve employees
 * @apiName RetrieveEmployees
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} employees List of employees.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.post('/findNewEmployee',
  token({ required: false, roles: ['admin'] }),
  findNewEmployee)

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
router.get('/:id', token({required: false, roles: ['admin']}), show)

/**
 * @api {put} /employees/:id Update employee
 * @apiName UpdateEmployee
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam {Object} identify Employee's FirstName.
 * @apiParam {Object} personalInformation Employee's LastName.
 * @apiParam {Object} jobInformation Employee's MiddleName.
 * @apiParam {Object} compensationInformation Employee's Sufix.
 * @apiSuccess {Object} employee Employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employee not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: false, roles: ['admin'] }),
  //body({ FirstName, LastName, MiddleName, Sufix, DisplayName, FormalName, Title, BirthName, Initials, Prefix, Gender, MaritalStatus, MaritalStatusSince, SecondNationality, ThirdNationality, NativePreferredLanguage, ChallengeStatus, CertificateStartDate, CertificateEndDate, Addresses }),
  body({ employee}),
  update)

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
router.delete('/:id', token({required: false, roles: ['admin']}), destroy)

export default router
