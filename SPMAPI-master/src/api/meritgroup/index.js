import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Meritgroup, { schema } from './model'

const router = new Router()
const { name, min, max } = schema.tree

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
  body({ name, min, max }),
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
  body({ name, min, max }),
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
