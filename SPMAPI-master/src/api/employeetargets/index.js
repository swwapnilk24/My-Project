import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export EmployeeTargets, { schema } from './model'

const router = new Router()
const { employeeid, plan, vesting_year, performance_year, percentage, abs, currency, amount } = schema.tree

/**
 * @api {post} /employeetargets Create employeetargets
 * @apiName CreateCountries
 * @apiGroup Countries
 * @apiParam countryName Country's name.
 * @apiParam status Country's status.
 * @apiSuccess {Object} Countries Country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Countries not found.
 */
router.post('/',
    body({ employeeid, plan, vesting_year, performance_year, percentage, abs, currency, amount }),
    create)

/**
 * @api {get} /employeetargets Retrieve country
 * @apiName RetrieveCountry
 * @apiGroup Countries
 * @apiUse listParams
 * @apiSuccess {Object[]} employeetargets List of employeetargets.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)
    

/**
 * @api {get} /employeetargets/:id Retrieve employeetargets
 * @apiName RetrieveCountries
 * @apiGroup Countries
 * @apiSuccess {Object} employeetargets country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 employeetargets not found.
 */
router.get('/:id',
    show)


/**
 * @api {put} /employeetargets Create employeetargets
 * @apiName CreateCountries
 * @apiGroup Countries
 * @apiParam countryName country's countryName.
 * @apiParam status country's status.
 * @apiSuccess {Object} Countries country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Countries not found.
 */
router.put('/:id',
    body({ employeeid, plan, vesting_year, performance_year, percentage, abs, currency, amount }),
    update)

/**
* @api {delete} /employeetargets/:id Delete employeetargets
* @apiName DeleteCountries
* @apiGroup Countries
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 Countries not found.
*/
router.delete('/:id',
    destroy)  


export default router