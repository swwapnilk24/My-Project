import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export SimulationVersion, { schema } from './model'

const router = new Router()
const { versionName, employeeid, meritRange, ipfRange, ltiRange, versionData } = schema.tree

/**
 * @api {post} /countries Create countries
 * @apiName CreateCountries
 * @apiGroup Countries
 * @apiParam countryName Country's name.
 * @apiParam status Country's status.
 * @apiSuccess {Object} Countries Country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Countries not found.
 */
router.post('/',
    body({ versionName, employeeid, meritRange, ipfRange, ltiRange, versionData:Object }),
    create)

/**
 * @api {get} /countries Retrieve country
 * @apiName RetrieveCountry
 * @apiGroup Countries
 * @apiUse listParams
 * @apiSuccess {Object[]} countries List of countries.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)
    

/**
 * @api {get} /countries/:id Retrieve countries
 * @apiName RetrieveCountries
 * @apiGroup Countries
 * @apiSuccess {Object} countries country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 countries not found.
 */
router.get('/:id',
    show)


/**
 * @api {put} /countries Create countries
 * @apiName CreateCountries
 * @apiGroup Countries
 * @apiParam countryName country's countryName.
 * @apiParam status country's status.
 * @apiSuccess {Object} Countries country data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Countries not found.
 */
router.put('/:id',
    body({ versionName, employeeid, meritRange, ipfRange, ltiRange,  versionData:Object }),
    update)

/**
* @api {delete} /countries/:id Delete countries
* @apiName DeleteCountries
* @apiGroup Countries
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 Countries not found.
*/
router.delete('/:id',
    destroy)  


export default router