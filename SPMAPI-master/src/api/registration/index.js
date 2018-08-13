import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show } from './controller'
import { schema } from './model'
export Registration, { schema } from './model'

const router = new Router()
const { userName, emailId, password, confirmPassword, firstName, lastName, gender } = schema.tree

/**
 * @api {post} /Registration Create Registration
 * @apiName CreateRegistration
 * @apiGroup Registration
 * @apiParam userName userName's name.
 * @apiParam emailId.
 * @apiParam password.
 * @apiParam confirmPassword.
 * @apiParam firstName.
 * @apiParam lastName.
 * @apiParam gender.
 * @apiSuccess {Object} Registration Registration data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Registration not found.
 */
router.post('/',
body({ userName, emailId, password, confirmPassword, firstName, lastName, gender }),
create)

/**
 * @api {get} /Registrations Retrieve Registrations
 * @apiName RetrieveRegistration
 * @apiGroup Registration
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} Registration List of Registration.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
query(),
index)

/**
 * @api {get} /Registrations/:id Retrieve Registrations
 * @apiName RetrieveEmployee
 * @apiGroup Employee
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} employee Employee's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Employee not found.
 * @apiError 401 admin access only.
 */
router.get('/:id', show)

export default router
