import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { show, create, deleteRow } from './controller'
import { schema } from './model'
export EmployeeBasedNominees, { schema } from './model'

const router = new Router()
const { EmployeeBasedNomineesSchema } = schema.tree;

router.get('/', show);
router.post('/', create);
router.post('/deleteRow', deleteRow);

export default router