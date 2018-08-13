import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, checkForInsert, tempShow, show, getRecordsById, destroy, update, updateDocuments, updateDocument, EmptyCollection, initialCheckForFullUpload, deleteDocument } from './controller'
import { schema } from './model'
export Master, { schema } from './model'

const router = new Router()
const { master } = schema.tree

/**
 * @api {post} /master Create master
 * @apiName CreateMaster
 * @apiGroup Master
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} Master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 * @apiError 401 admin access only.
 */
router.post('/',
token({ required: false, roles: ['admin'] }),
create)

router.post('/updateDocuments', updateDocuments);
router.post('/updateDocument', updateDocument);
router.post('/initialCheckForFullUpload', initialCheckForFullUpload);
router.post('/emptyCollection', EmptyCollection);
router.post('/deleteDocument', deleteDocument);
router.post('/checkForInsert', checkForInsert);

/**
 * @api {get} /master Retrieve master
 * @apiName RetrieveMaster
 * @apiGroup Master
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 * @apiError 401 master access only.
 */
router.get('/', token({required: false, roles: ['admin']}), show)


/**
 * @api {get} /master/:id Retrieve master
 * @apiName RetrieveMaster
 * @apiGroup Master
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} master Master's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 * @apiError 401 master access only.
 */
router.get('/:id', token({required: false, roles: ['admin']}), getRecordsById)


// router.get('/getData/:id', token({required: false, roles: ['admin']}), getIdAndUpdate)

/**
 * @api {put} /master/:id Update mastertype
 * @apiName UpdateMaster
 * @apiGroup Maste
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} maste Maste's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Maste not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
token({ required: false, roles: ['admin'] }),
body({ master}),
update)



/**
 * @api {delete} /master/:id Delete mastertype
 * @apiName DeleteMastertype
 * @apiGroup Mastertype
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Mastertype not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
token({ required: false, roles: ['admin'] }),
destroy)


export default router