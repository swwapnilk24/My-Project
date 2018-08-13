import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index } from './controller'
import { schema } from './model'
export OrgHierarchy, { schema } from './model'

const router = new Router()
const { employeeid, cpm_manager, operational_manager } = schema.tree

/**
 * @api {post} /OrgHierarchy Create OrgHierarchy
 * @apiName CreateOrgHierarchy
 * @apiGroup OrgHierarchy
 * @apiParam employeeid employeeid's.
 * @apiParam cpm_manager cpm_manager's status.
 * @apiSuccess {Object} OrgHierarchydata.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Countries not found.
 */
router.post('/',
body({ employeeid, cpm_manager, operational_manager }),
create)

/**
 * @api {get} /OrgHierarchy Retrieve OrgHierarchy
 * @apiName RetrieveOrgHierarchy
 * @apiGroup OrgHierarchy
 * @apiUse listParams
 * @apiSuccess {Object[]} OrgHierarchy List of OrgHierarchy.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
// router.get('/',
// query(),
// index)


export default router
