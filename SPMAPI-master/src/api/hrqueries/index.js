import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show } from './controller'
import { schema } from './model'
export HRQueries, { schema } from './model'

const router = new Router()
const { issueType, requestDate, subject, issueDesc, filePath, notification, status, approvalDate, approvedBy, createdBy, comments} = schema.tree

/**
 * @api {post} /hrQueries Create hrQueries
 * @apiName CreateHRQueries
 * @apiGroup HRQueries
 * @apiParam issueType issueType's name.
 * @apiParam requestDate.
 * @apiParam subject.
 * @apiParam issueDesc.
 * @apiParam filePath.
 * @apiParam notification.
 * @apiParam status.
 * @apiParam approvalDate
 * @apiParam approvedBy
 * @apiParam createdBy
 * @apiParam comments 
 * @apiSuccess {Object} HRQueries HRQueries data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 HRQueries not found.
 */
router.post('/',
body({ issueType, requestDate, subject, issueDesc, filePath, notification, status, approvalDate, approvedBy, createdBy, comments }),
create)

/**
 * @api {get} /HRQueries Create hrQueries
 * @apiName GetHRQueries
 * @apiGroup HRQueries
 * @apiParam issueType issueType's name.
 * @apiParam requestDate.
 * @apiParam subject.
 * @apiParam issueDesc.
 * @apiParam filePath.
 * @apiParam notification.
 * @apiParam status.
 * @apiParam approvalDate
 * @apiParam approvedBy
 * @apiParam createdBy
 * @apiParam comments 
 * @apiSuccess {Object} HRQueries HRQueries data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ProductionSupport not found.
 */
router.get('/',
query(),
index)

/**
 * @api {get} /hrQueries/:id Create hrQueries
 * @apiName GetHRQueries
 * @apiGroup HRQueries
 * @apiParam issueType issueType's name.
 * @apiParam requestDate.
 * @apiParam subject.
 * @apiParam issueDesc.
 * @apiParam filePath.
 * @apiParam notification.
 * @apiParam status.
 * @apiParam approvalDate
 * @apiParam approvedBy
 * @apiParam createdBy
 * @apiParam comments 
 * @apiSuccess {Object} HRQueries HRQueries data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 HRQueries not found.
 */
router.get('/:id',
show)


export default router