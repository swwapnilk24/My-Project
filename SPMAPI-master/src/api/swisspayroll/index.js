import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  create,
  index,
  show,
  update,
  destroy,
  payrollByCompany,
  generatedPayrollList,
  payrollEmpList,
  pushPayroll,
  updateEmpPayroll,
  empPayrollbyMonth,
  empPayrollbyYear
} from './controller'
import { schema } from './model'
export Swisspayroll, { schema } from './model'

const router = new Router()
const { company, employee, branch, payroll } = schema.tree

/**
 * @api {post} /swisspayrolls Create swisspayroll
 * @apiName CreateSwisspayroll
 * @apiGroup Swisspayroll
 * @apiParam company Swisspayroll's company.
 * @apiParam employee Swisspayroll's employee.
 * @apiParam branch Swisspayroll's branch.
 * @apiParam payroll Swisspayroll's payroll.
 * @apiSuccess {Object} swisspayroll Swisspayroll's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swisspayroll not found.
 */
router.post('/',
  create)

router.post('/generateemppayroll',
  pushPayroll)

router.post('/updateemppayroll',
  updateEmpPayroll)

/**
 * @api {get} /swisspayrolls Retrieve swisspayrolls
 * @apiName RetrieveSwisspayrolls
 * @apiGroup Swisspayroll
 * @apiUse listParams
 * @apiSuccess {Object[]} swisspayrolls List of swisspayrolls.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /swisspayrolls/:id Retrieve swisspayroll
 * @apiName RetrieveSwisspayroll
 * @apiGroup Swisspayroll
 * @apiSuccess {Object} swisspayroll Swisspayroll's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swisspayroll not found.
 */
router.get('/:id',
  show)

router.get('/company/:companyid',
  payrollByCompany)

// Get employee list , for generated payroll by company
router.get('/company/:companyid/:year/:month',
  generatedPayrollList)

// Get employee payroll by month
router.get('/employeepayroll/:id/:year/:month',
  empPayrollbyMonth)

// http://localhost:9000/swisspayroll/emplist/company/5a69df48ca6881d9b5128a2c/june
// Get employee list to generate payroll by company

router.get('/emplist/company/:companyid/:year/:month',
  payrollEmpList)

// Get emp salary slips by start year and end year
router.get('/emppayslip/:empid/:startyear/:endyear',
  empPayrollbyYear)

/**
 * @api {put} /swisspayrolls/:id Update swisspayroll
 * @apiName UpdateSwisspayroll
 * @apiGroup Swisspayroll
 * @apiParam company Swisspayroll's company.
 * @apiParam employee Swisspayroll's employee.
 * @apiParam branch Swisspayroll's branch.
 * @apiParam payroll Swisspayroll's payroll.
 * @apiSuccess {Object} swisspayroll Swisspayroll's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swisspayroll not found.
 */
router.put('/:id',
  body({ company, employee, branch, payroll }),
  update)

/**
 * @api {delete} /swisspayrolls/:id Delete swisspayroll
 * @apiName DeleteSwisspayroll
 * @apiGroup Swisspayroll
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Swisspayroll not found.
 */
router.delete('/:id',
  destroy)

export default router
