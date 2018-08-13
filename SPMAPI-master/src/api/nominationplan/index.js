import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create } from './controller'
import { schema } from './model'
export NominationPlan, { schema } from './model'

const router = new Router()
const { planId, bandId, nominationPlan } = schema.tree

/**
 * @api {post} /nominationPlan Create nominationPlan
 * @apiName CreateOrgHierarchy
 * @apiGroup nominationPlan
 * @apiParam employeeid employeeid's.
 * @apiParam nominationPlan nominationPlan's status.
 * @apiSuccess {Object} nominationPlan.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Countries not found.
 */
router.post('/',
body({ planId, bandId, nominationPlan }),
create)

export default router