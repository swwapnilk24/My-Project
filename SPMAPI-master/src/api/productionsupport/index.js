import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show } from './controller'
import { schema } from './model'
export ProductionSupport, { schema } from './model'

const router = new Router()
const { issueType, requestDate, subject, issueDesc, filePath, notification, status, approvalDate, approvedBy, createdBy, comments} = schema.tree

/**
 * @api {post} /productionSupport Create productionSupport
 * @apiName CreateproductionSupport
 * @apiGroup ProductionSupport
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
 * @apiSuccess {Object} ProductionSupport ProductionSupport data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ProductionSupport not found.
 */
router.post('/',
body({ issueType, requestDate, subject, issueDesc, filePath, notification, status, approvalDate, approvedBy, createdBy, comments }),
create)

/**
 * @api {get} /productionSupport Create productionSupport
 * @apiName GetproductionSupport
 * @apiGroup ProductionSupport
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
 * @apiSuccess {Object} ProductionSupport ProductionSupport data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ProductionSupport not found.
 */
router.get('/',
query(),
index)

/**
 * @api {get} /productionSupport/:id Create productionSupport
 * @apiName GetproductionSupport
 * @apiGroup ProductionSupport
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
 * @apiSuccess {Object} ProductionSupport ProductionSupport data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 ProductionSupport not found.
 */
router.get('/:id',
show)


export default router