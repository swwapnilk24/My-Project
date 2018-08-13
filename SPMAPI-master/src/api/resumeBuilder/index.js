import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, showResumeData, updateProfileSummary, updateContacts } from './controller'
import { schema } from './model'
export resuumeBuilderModal, { schema } from './model'

const router = new Router()
// const { corporateAddress } = schema.tree

router.post('/', create)

router.get('/:resume_key', token({ required: false, roles: ['admin'] }), showResumeData);
router.put('/updateProfileSummary/:resume_key', updateProfileSummary);
router.put('/updateContacts/:resume_key', updateContacts);


export default router
