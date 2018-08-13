import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index } from './controller'
import { schema } from './model'
export CompensationPlanStatus, { schema } from './model'

const router = new Router()
const {} = schema.tree

/**
 * @api {get} /CompensationPlanStatus Retrieve CompensationPlanStatus
 * @apiName RetrieveCompensationPlanStatus
 * @apiGroup CompensationPlanStatus
 * @apiUse listParams
 * @apiSuccess {Object[]} CompensationPlanStatus List of CompensationPlanStatus.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
query(),
index)

export default router
