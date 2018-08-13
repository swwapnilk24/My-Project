import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { create, show, destroy, update, updateLeavesMasterData } from './controller';
import { schema } from './model';
export LeavesMasterData, { schema } from './model';

const router = new Router()
const { leavesmaster } = schema.tree

/**
 * @api {post} /leavesMaster Create leavesMaster
 * @apiName CreateLeavesMasterData
 * @apiGroup Leaves
 * @apiPermission admin
 * @apiSuccess {Object} LeavesMasterData LeavesMasterData's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 * @apiError 401 admin access only.
 */
router.post('/', updateLeavesMasterData);

/**
 * @api {get} /leavesMaster Retrieve leavesMaster
 * @apiName RetrieveLeavesMasterData
 * @apiGroup Leaves
 * @apiPermission admin
 * @apiSuccess {Object} LeavesMasterData LeavesMasterData's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Master not found.
 * @apiError 401 master access only.
 */
router.get('/', show);

/**
 * @api {put} /leavesMaster/:id Update leavesMaster
 * @apiName UpdateLeavesMasterData
 * @apiGroup Leaves
 * @apiPermission admin
 * @apiSuccess {Object} LeavesMasterData LeavesMasterData's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Maste not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
    body({ leavesmaster }),
    update);

/**
 * @api {delete} /leavesMaster/:id Delete leavesMaster
 * @apiName DeleteLeavesMasterData
 * @apiGroup Leaves
 * @apiPermission admin
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Mastertype not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id', destroy);

export default router;