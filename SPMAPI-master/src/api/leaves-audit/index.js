import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { updateLeavesAudit, getLeavesAudit } from './controller'
import { schema } from './model'
export LeavesAudit, { schema } from './model'

const router = new Router()
// const { } = schema.tree

/**
 * @api {post} /leavesAudit Create Leaves Audit
 * @apiName Create Leaves Audit
 * @apiGroup Leaves
 * @apiPermission admin
 * @apiSuccess {Object} leavesAudit Leaves Audit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Leaves Audit not found.
 * @apiError 401 admin access only.
 */
router.post('/:id',
    updateLeavesAudit);

router.post('/',
    updateLeavesAudit);

/**
 * @api {get} /leavesAudit Retrieve Leaves Audit
 * @apiName Retrieve Leaves Audit
 * @apiGroup Leaves
 * @apiPermission admin
 * @apiSuccess {Object[]} leavesAudit List of Leaves Audit.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */

router.get('/', getLeavesAudit);

export default router;
