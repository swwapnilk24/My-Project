import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export BandsAndPlans, { schema } from './model'

const router = new Router()
const { name, code } = schema.tree

/**
 * @api {get} /countries Retrieve country
 * @apiName RetrieveCountry
 * @apiGroup Countries
 * @apiUse listParams
 * @apiSuccess {Object[]} countries List of countries.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
    query(),
    index)

export default router