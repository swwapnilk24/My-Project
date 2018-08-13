import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import {
  create,
  index,
  show,
  update,
  destroy,
  insertMany
} from './controller'
import { schema } from './model'
export Swisscontons, { schema } from './model'

const router = new Router()
const { name, code } = schema.tree

/**
 * @api {post} /swisscontons Create swisscontons
 * @apiName CreateSwisscontons
 * @apiGroup Swisscontons
 * @apiParam name Swisscontons's name.
 * @apiParam code Swisscontons's code.
 * @apiSuccess {Object} swisscontons Swisscontons's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swisscontons not found.
 */
router.post('/',
  body({ name, code }),
  create)

router.post('/insertmany',
  insertMany)

/**
 * @api {get} /swisscontons Retrieve swisscontons
 * @apiName RetrieveSwisscontons
 * @apiGroup Swisscontons
 * @apiUse listParams
 * @apiSuccess {Object[]} swisscontons List of swisscontons.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /swisscontons/:id Retrieve swisscontons
 * @apiName RetrieveSwisscontons
 * @apiGroup Swisscontons
 * @apiSuccess {Object} swisscontons Swisscontons's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swisscontons not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /swisscontons/:id Update swisscontons
 * @apiName UpdateSwisscontons
 * @apiGroup Swisscontons
 * @apiParam name Swisscontons's name.
 * @apiParam code Swisscontons's code.
 * @apiSuccess {Object} swisscontons Swisscontons's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swisscontons not found.
 */
router.put('/:id',
  body({ name, code }),
  update)

/**
 * @api {delete} /swisscontons/:id Delete swisscontons
 * @apiName DeleteSwisscontons
 * @apiGroup Swisscontons
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Swisscontons not found.
 */
router.delete('/:id',
  destroy)

export default router
