import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Actualspent, { schema } from './model'

const router = new Router()

const { actualspent, budgetallocated, countryname, divisionname } = schema.tree

/**
 * @api {post} /actualspent Create actualspent
 * @apiName CreateActualspent
 * @apiGroup Actualspent
 * @apiParam actualspent Actualspent's actualspent.
 * @apiParam budgetallocated Actualspent's budgetallocated.
 * @apiParam rating Actualspent's rating.
 * @apiSuccess {Object} Actualspent Actualspent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Actualspent not found.
 */
router.post('/',
body({ actualspent, budgetallocated, countryname, divisionname }),
create)

/**
 * @api {get} /actualspent Retrieve actualspent
 * @apiName Retrieveactualspent
 * @apiGroup actualspent
 * @apiUse listParams
 * @apiSuccess {Object[]} actualspent List of actualspent.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
query(),
index)

/**
 * @api {get} /actualspent/:id Retrieve actualspent
 * @apiName Retrieveactualspent
 * @apiGroup actualspent
 * @apiSuccess {Object} actualspent actualspent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 actualspent not found.
 */
router.get('/:id',
show)

/**
 * @api {put} /actualspent Create actualspent
 * @apiName CreateActualspent
 * @apiGroup Actualspent
 * @apiParam actualspent Actualspent's actualspent.
 * @apiParam budgetallocated Actualspent's budgetallocated.
 * @apiParam rating Actualspent's rating.
 * @apiSuccess {Object} Actualspent Actualspent's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Actualspent not found.
 */
router.put('/:id',
body({ actualspent, budgetallocated, countryname, divisionname }),
update)

/**
* @api {delete} /actualspent/:id Delete actualspent
* @apiName Deleteactualspent
* @apiGroup actualspent
* @apiSuccess (Success 204) 204 No Content.
* @apiError 404 actualspent not found.
*/
router.delete('/:id',
destroy)

export default router