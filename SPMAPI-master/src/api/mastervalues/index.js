import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, showData, getRecordsById, destroy, updateRecordsById } from './controller'
import { schema } from './model'
export MasterValue, { schema } from './model'

const router = new Router()
const { master } = schema.tree

/**
 * @api {post} /mastervalues Create mastervalues
 * @apiName CreateMasterValue
 * @apiGroup MasterValue
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} MasterValue MasterValue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 MasterValue not found.
 * @apiError 401 admin access only.
 */
router.post('/',
token({ required: false, roles: ['admin'] }),
create)

/**
 * @api {get} /mastervalues Retrieve mastervalues
 * @apiName RetrieveMaster
 * @apiGroup Master
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} mastervalues MasterValue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 MasterValue not found.
 * @apiError 401 MasterValue access only.
 */
router.get('/', token({required: false, roles: ['admin']}), showData)

/**
 * @api {get} /mastervalues/id Retrieve mastervalues
 * @apiName RetrieveMaster
 * @apiGroup Master
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} mastervalues MasterValue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 MasterValue not found.
 * @apiError 401 MasterValue access only.
 */
router.get('/:id', token({required: false, roles: ['admin']}), getRecordsById)


/**
 * @api {delete} /mastervalues/:id Delete mastervalues
 * @apiName DeleteMastervalues
 * @apiGroup Mastervalues
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Mastervalues not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id', token({required: false, roles: ['admin']}), destroy)

/**
 * @api {put} /mastervalues update mastervalues
 * @apiName DeleteMastervalues
 * @apiGroup Mastervalues
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Mastervalues not found.
 * @apiError 401 admin access only.
 */
router.put('/:id', updateRecordsById)

export default router