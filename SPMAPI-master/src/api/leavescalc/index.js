import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index, show, getLeaveByEmpId } from './controller'
import { schema } from './model'
export Leavescalc, { schema } from './model'

const router = new Router()
const { issueType, requestDate, subject, issueDesc, filePath, notification, status, approvalDate, approvedBy, createdBy, comments} = schema.tree

router.get('/',
query(),
index)

router.get('/leaveData/:id',
show)

router.get('/leaveByEmpId/:id',
getLeaveByEmpId)

export default router