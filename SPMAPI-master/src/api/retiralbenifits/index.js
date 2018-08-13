import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create,
  index,
  show,
  update,
  destroy,
  getRBByCountry,
  getRBByCompany
} from './controller'
import { schema } from './model'
export Retiralbenifits, { schema } from './model'

const router = new Router()
const { name, country, company, region, position } = schema.tree

/**
 * @api {post} /retiralbenifits Create retiralbenifits
 * @apiName CreateRetiralbenifits
 * @apiGroup Retiralbenifits
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam name Retiralbenifits's name.
 * @apiParam country Retiralbenifits's country.
 * @apiParam company Retiralbenifits's company.
 * @apiParam region Retiralbenifits's region.
 * @apiSuccess {Object} retiralbenifits Retiralbenifits's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Retiralbenifits not found.
 * @apiError 401 master access only.
 */
router.post('/',
  body({ name, country, company, region, position }),
  create)

/**
 * @api {get} /retiralbenifits Retrieve retiralbenifits
 * @apiName RetrieveRetiralbenifits
 * @apiGroup Retiralbenifits
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of retiralbenifits.
 * @apiSuccess {Object[]} rows List of retiralbenifits.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /retiralbenifits/:id Retrieve retiralbenifits
 * @apiName RetrieveRetiralbenifits
 * @apiGroup Retiralbenifits
 * @apiSuccess {Object} retiralbenifits Retiralbenifits's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Retiralbenifits not found.
 */
router.get('/:id',
  show)

/**
 * @api {get} /retiralbenifits/county/:country Retrieve retiralbenifits by country
 * @apiName RetrieveRetiralbenifitsByCountry
 * @apiGroup Retiralbenifits
 * @apiSuccess {Object} retiralbenifits Retiralbenifits's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Retiralbenifits not found.
 */
router.get('/country/:country',
  getRBByCountry)

/**
 * @api {get} /retiralbenifits/county/:country /company/:company Retrieve retiralbenifits by country and Comp
 * @apiName RetrieveRetiralbenifitsByCountry
 * @apiGroup Retiralbenifits
 * @apiSuccess {Object} retiralbenifits Retiralbenifits's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Retiralbenifits not found.
 */
router.get('/country/:country/company/:company',
  getRBByCompany)

/**
 * @api {put} /retiralbenifits/:id Update retiralbenifits
 * @apiName UpdateRetiralbenifits
 * @apiGroup Retiralbenifits
 * @apiParam name Retiralbenifits's name.
 * @apiParam country Retiralbenifits's country.
 * @apiParam company Retiralbenifits's company.
 * @apiParam region Retiralbenifits's region.
 * @apiSuccess {Object} retiralbenifits Retiralbenifits's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Retiralbenifits not found.
 */
router.put('/:id',
  body({ name, country, company, region }),
  update)

/**
 * @api {delete} /retiralbenifits/:id Delete retiralbenifits
 * @apiName DeleteRetiralbenifits
 * @apiGroup Retiralbenifits
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Retiralbenifits not found.
 */
router.delete('/:id',
  destroy)

export default router
