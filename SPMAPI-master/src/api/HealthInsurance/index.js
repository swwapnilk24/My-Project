import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { show, create, update, deleteRow, planDataForEmployee} from './controller'
import { schema } from './model'
export HealthInsurance, { schema } from './model'

const router = new Router()
const { HealthInsuranceSchema } = schema.tree;

router.get('/:company_id', show);
router.get('/planDataForEmployee/:company/:workCompany/:position', planDataForEmployee);
router.post('/', create);
router.put('/:company_id', update);
router.delete('/:company_id/:rowId', deleteRow);
export default router