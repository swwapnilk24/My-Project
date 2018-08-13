import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { show, create, update,deleteRow, showPlans } from './controller'
import { schema } from './model'
export HealthInsurancePlans, { schema } from './model'
import { uploadfile } from '../../services/uploadPublic'


// var multer  = require('multer')
// var upload = multer({ dest: './files' })

const router = new Router()
const { HealthInsuranceSchema } = schema.tree;

router.get('/:company_id', show);
router.get('/showplans/:company_id', showPlans);
router.post('/', create);
router.put('/:company_id/:id', uploadfile(), update);
router.delete('/:company_id/:rowId', deleteRow);
export default router