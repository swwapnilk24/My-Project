import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, getByDate, show, update, destroy, bulkInsert } from './controller'
import { schema } from './model'
export SwissCompensation, { schema } from './model'

const router = new Router()
const { name, empCont, employerCont } = schema.tree

/**
 * @api {post} /swizzdeductions Create swizzdeductions
 * @apiName CreateSwizzdeductions
 * @apiGroup Swizzdeductions
 * @apiParam name Swizzdeductions's name.
 * @apiParam empCont Swizzdeductions's empCont.
 * @apiParam employerCont Swizzdeductions's employerCont.
 * @apiSuccess {Object} swizzdeductions Swizzdeductions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swizzdeductions not found.
 */
router.post('/',
  body({ name, empCont, employerCont }),
  create)

router.post('/bulkinsert',
bulkInsert)

/**
 * @api {get} /swizzdeductions Retrieve swizzdeductions
 * @apiName RetrieveSwizzdeductions
 * @apiGroup Swizzdeductions
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of swizzdeductions.
 * @apiSuccess {Object[]} rows List of swizzdeductions.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
// router.get('/',
//   query(),
//   index)
router.get('/',
  getByDate)

/**
 * @api {get} /swizzdeductions/:id Retrieve swizzdeductions
 * @apiName RetrieveSwizzdeductions
 * @apiGroup Swizzdeductions
 * @apiSuccess {Object} swizzdeductions Swizzdeductions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swizzdeductions not found.
 */
router.get('/:id',
  show)

/**
 * @api {put} /swizzdeductions/:id Update swizzdeductions
 * @apiName UpdateSwizzdeductions
 * @apiGroup Swizzdeductions
 * @apiParam name Swizzdeductions's name.
 * @apiParam empCont Swizzdeductions's empCont.
 * @apiParam employerCont Swizzdeductions's employerCont.
 * @apiSuccess {Object} swizzdeductions Swizzdeductions's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Swizzdeductions not found.
 */
router.put('/:id',
  body({ name, empCont, employerCont }),
  update)

/**
 * @api {delete} /swizzdeductions/:id Delete swizzdeductions
 * @apiName DeleteSwizzdeductions
 * @apiGroup Swizzdeductions
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Swizzdeductions not found.
 */
router.delete('/:id',
  destroy)

export default router
