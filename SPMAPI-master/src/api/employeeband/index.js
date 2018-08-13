import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Employeeband, { schema } from './model'

const router = new Router()

const { bandname, bandcode } = schema.tree

/**
 * @api {post} /salaryband Create salaryband
 * @apiName CreateSalaryband
 * @apiGroup Salaryband
 * @apiParam bandname Salaryband's bandname.
 * @apiParam bandcode Salaryband's bandcode.
 * @apiSuccess {Object} Salaryband Salaryband's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Salaryband not found.
 */
router.post('/',
body({ bandname, bandcode }),
create)

/**
 * @api {get} /Salaryband Retrieve Salaryband
 * @apiName RetrieveSalaryband
 * @apiGroup Salaryband
 * @apiUse listParams
 * @apiSuccess {Object[]} Salaryband List of Salaryband.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
query(),
index)

/**
 * @api {get} /Salaryband/:id Retrieve Salaryband
 * @apiName RetrieveSalaryband
 * @apiGroup Salaryband
 * @apiSuccess {Object} Salaryband Salaryband's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Salaryband not found.
 */
router.get('/:id',
show)

/**
 * @api {put} /Salaryband Create Salaryband
 * @apiName UpdateSalaryband
 * @apiGroup Salaryband
 * @apiParam bandname Salaryband's bandname.
 * @apiParam bandcode Salaryband's bandcode.
 * @apiSuccess {Object} Salaryband Salaryband's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Salaryband not found.
 */
router.put('/:id',
body({ bandname, bandcode }),
update)

/**
* @api {delete} /Salaryband/:id Delete Salaryband
* @apiName DeleteSalaryband
* @apiGroup Salaryband
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 Salaryband not found.
*/
router.delete('/:id',
destroy)

export default router
