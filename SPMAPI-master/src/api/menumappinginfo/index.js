import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export MenuMappingInfo, { schema } from './model'

const router = new Router()
const { employeeId, employeeRole, roleId, screenName, screenId, createdDate } = schema.tree

/**
 * @api {post} /meritgroups Create meritgroup
 * @apiName CreateMeritgroup
 * @apiGroup Meritgroup
 * @apiParam name Meritgroup's name.
 * @apiParam min Meritgroup's min.
 * @apiParam max Meritgroup's max.
 * @apiSuccess {Object} meritgroup Meritgroup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meritgroup not found.
 */
router.post('/',
  body({ employeeId, employeeRole, roleId, screenName, screenId, createdDate }),
  create)

/**
 * @api {get} /meritgroups Retrieve meritgroups
 * @apiName RetrieveMeritgroups
 * @apiGroup Meritgroup
 * @apiUse listParams
 * @apiSuccess {Object[]} meritgroups List of meritgroups.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /meritgroups/:id Retrieve meritgroup
 * @apiName RetrieveMeritgroup
 * @apiGroup Meritgroup
 * @apiSuccess {Object} meritgroup Meritgroup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meritgroup not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /meritgroups/:id Update meritgroup
 * @apiName UpdateMeritgroup
 * @apiGroup Meritgroup
 * @apiParam name Meritgroup's name.
 * @apiParam min Meritgroup's min.
 * @apiParam max Meritgroup's max.
 * @apiSuccess {Object} meritgroup Meritgroup's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Meritgroup not found.
 */
router.put('/:id',
  body({ employeeId, employeeRole, roleId, screenName, screenId, createdDate }),
  update)

/**
 * @api {delete} /meritgroups/:id Delete meritgroup
 * @apiName DeleteMeritgroup
 * @apiGroup Meritgroup
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Meritgroup not found.
 */
router.delete('/:id',
  destroy)

export default router
