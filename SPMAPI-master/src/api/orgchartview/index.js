import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { index, show } from './controller'
import { schema } from './model'
export OrgchartView, { schema } from './model'

const router = new Router()
const {} = schema.tree

/**
 * @api {get} /OrgchartView Retrieve OrgchartView
 * @apiName RetrieveCompensationplans
 * @apiGroup OrgchartView
 * @apiUse listParams
 * @apiSuccess {Object[]} OrgchartView List of OrgchartView.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
query(),
index)

/**
 * @api {get} /OrgchartView Retrieve OrgchartView
 * @apiName RetrieveCompensationplans
 * @apiGroup OrgchartView
 * @apiUse listParams
 * @apiSuccess {Object[]} OrgchartView List of OrgchartView.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/:id',
show)

export default router