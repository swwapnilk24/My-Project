import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
// import { master } from '../../services/passport'
import { create, index, show, update, destroy, verifyLogin } from './controller'
import { schema } from './model'
export Role, { schema } from './model'

const router = new Router()
const { role, emailId, password, confirmPassword, firstName, lastName, companyCode, company } = schema.tree

/**
 * @api {post} /roles Create role
 * @apiName CreateRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Role's name.
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.post('/',
  // master(),
  body({ role, emailId, password, confirmPassword, firstName, lastName, companyCode, company }),
  create)

router.post('/verify',
  verifyLogin)

/**
 * @api {get} /roles Retrieve roles
 * @apiName RetrieveRoles
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} roles List of roles.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  // master(),
  query(),
  index)

/**
 * @api {get} /roles/:id Retrieve role
 * @apiName RetrieveRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  // master(),
  show)

/**
 * @api {put} /roles/:id Update role
 * @apiName UpdateRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Role's name.
 * @apiSuccess {Object} role Role's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  // master(),
  body({ role, emailId, password, confirmPassword, firstName, lastName, companyCode, company }),
  update)

/**
 * @api {delete} /roles/:id Delete role
 * @apiName DeleteRole
 * @apiGroup Role
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Role not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  // master(),
  destroy)

export default router
