import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Orgchart, { schema } from './model'

const router = new Router()
const { key, name, abs, target, budget, title, parent, parentName, merit, ipf, bpf, cpf, performance} = schema.tree

/**
 * @api {post} /orgchart Create orgchart
*/
router.post('/',
  body({ key, name, abs, target, budget, title, parent, parentName, merit, ipf, bpf, cpf, performance }),
  create)

/**
 * @api {post} /orgchart Create orgchart
*/
router.post('/addemployee',
  body({ name, abs, target, budget, title, parent, parentName, merit, ipf, bpf, cpf, performance }),
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
  body({ key, name, abs, target, budget, title, parent, parentName, merit, ipf, bpf, cpf, performance }),
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
