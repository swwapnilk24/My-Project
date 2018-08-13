import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy,getEmpByBand } from './controller'
import { schema } from './model'
export Employee, { schema } from './model'

const router = new Router()

const { name, jobtitle, band, profile_picture } = schema.tree

/**
 * @api {post} /employee Create employee
 * @apiName Createemployee
 * @apiGroup employee
 * @apiParam countryName employee's countryName.
 * @apiParam divisionName employee's divisionName.
 * @apiParam rating employee's rating.
 * @apiSuccess {Object} employee employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 employee not found.
 */
router.post('/',
body({ name, jobtitle, band, profile_picture  }),
create)

/**
 * @api {get} /employee Retrieve employee
 * @apiName Retrieveemployee
 * @apiGroup employee
 * @apiUse listParams
 * @apiSuccess {Object[]} employee List of employee.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/getEmployeesByBand/:id',
query(),
getEmpByBand)

/**
 * @api {get} /employee Retrieve employee
 * @apiName Retrieveemployee
 * @apiGroup employee
 * @apiUse listParams
 * @apiSuccess {Object[]} employee List of employee.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
query(),
index)

/**
 * @api {get} /employee/:id Retrieve employee
 * @apiName Retrieveemployee
 * @apiGroup employee
 * @apiSuccess {Object} employee employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 employee not found.
 */
router.get('/:id',
show)

/**
 * @api {put} /employee Create employee
 * @apiName Updateemployee
 * @apiGroup employee
 * @apiParam countryName employee's countryName.
 * @apiParam divisionName employee's divisionName.
 * @apiParam rating employee's rating.
 * @apiSuccess {Object} employee employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 employee not found.
 */
router.put('/:id',
body({ name, jobtitle, band, profile_picture }),
update)

/**
* @api {delete} /employee/:id Delete employee
* @apiName Deleteemployee
* @apiGroup employee
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 employee not found.
*/
router.delete('/:id',
destroy)

export default router
