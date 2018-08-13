import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Compensationplan, { schema } from './model'

const router = new Router()
const { ipf, bpf, cpf, meritamount, performance_year, objective, behaviour, status, employeeid, reviewrating, prerating, currencycode, currentsalary, increasedate, compratio, merit, lumpsum, adjustment, promotion, paygrade, effectivedate, ltAmount } = schema.tree

/**
 * @api {post} /compensationplans Create compensationplan
 * @apiName CreateCompensationplan
 * @apiGroup Compensationplan
 * @apiParam name Compensationplan's name.
 * @apiParam jobtitle Compensationplan's jobtitle.
 * @apiParam reviewrating Compensationplan's reviewrating.
 * @apiParam prerating Compensationplan's prerating.
 * @apiParam currencycode Compensationplan's currencycode.
 * @apiParam currentsalary Compensationplan's currentsalary.
 * @apiParam increasedate Compensationplan's increasedate.
 * @apiParam compratio Compensationplan's compratio.
 * @apiParam min Compensationplan's min.
 * @apiParam max Compensationplan's max.
 * @apiParam merit Compensationplan's merit.
 * @apiParam lumpsum Compensationplan's lumpsum.
 * @apiParam adjustment Compensationplan's adjustment.
 * @apiParam promotion Compensationplan's promotion.
 * @apiParam paygrade Compensationplan's paygrade.
 * @apiParam effectivedate Compensationplan's effectivedate.
 * @apiSuccess {Object} compensationplan Compensationplan's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Compensationplan not found.
 */
router.post('/',
  body({ ipf, bpf, cpf, employeeid, objective, behaviour, status, performance_year, meritamount, reviewrating, prerating, currencycode, currentsalary, increasedate, compratio, merit, lumpsum, adjustment, promotion, paygrade, effectivedate, ltAmount}),
  create)

/**
 * @api {get} /compensationplans Retrieve compensationplans
 * @apiName RetrieveCompensationplans
 * @apiGroup Compensationplan
 * @apiUse listParams
 * @apiSuccess {Object[]} compensationplans List of compensationplans.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /compensationplans/:id Retrieve compensationplan
 * @apiName RetrieveCompensationplan
 * @apiGroup Compensationplan
 * @apiSuccess {Object} compensationplan Compensationplan's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Compensationplan not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /compensationplans/:id Update compensationplan
 * @apiName UpdateCompensationplan
 * @apiGroup Compensationplan
 * @apiParam name Compensationplan's name.
 * @apiParam jobtitle Compensationplan's jobtitle.
 * @apiParam reviewrating Compensationplan's reviewrating.
 * @apiParam prerating Compensationplan's prerating.
 * @apiParam currencycode Compensationplan's currencycode.
 * @apiParam currentsalary Compensationplan's currentsalary.
 * @apiParam increasedate Compensationplan's increasedate.
 * @apiParam compratio Compensationplan's compratio.
 * @apiParam min Compensationplan's min.
 * @apiParam max Compensationplan's max.
 * @apiParam merit Compensationplan's merit.
 * @apiParam lumpsum Compensationplan's lumpsum.
 * @apiParam adjustment Compensationplan's adjustment.
 * @apiParam promotion Compensationplan's promotion.
 * @apiParam paygrade Compensationplan's paygrade.
 * @apiParam effectivedate Compensationplan's effectivedate.
 * @apiSuccess {Object} compensationplan Compensationplan's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Compensationplan not found.
 */
router.put('/:id',
  body({ employeeid, ipf, bpf, cpf, objective, behaviour, status, performance_year, meritamount, reviewrating, prerating, currencycode, currentsalary, increasedate, compratio, merit, lumpsum, adjustment, promotion, paygrade, effectivedate, ltAmount }),
  update)

/**
 * @api {delete} /compensationplans/:id Delete compensationplan
 * @apiName DeleteCompensationplan
 * @apiGroup Compensationplan
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Compensationplan not found.
 */
router.delete('/:id',
  destroy)

export default router
