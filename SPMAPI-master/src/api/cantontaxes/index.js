import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, show, showAll, deleteDocument, checkForInsert, update, checkForInitialFullUpload } from './controller'
import { schema } from './model'
export CantonTaxes, { schema } from './model'

const router = new Router()
const { CantonTaxes } = schema.tree

router.post('/',
token({ required: false, roles: ['admin'] }),
create);
router.post('/delete', deleteDocument);
router.post('/checkForInsert', checkForInsert);
router.post('/update', update);
router.post('/checkForInitialFullUpload', checkForInitialFullUpload);

router.get('/', show);
router.get('/showAll', showAll);

export default router