import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { create,
  index,
  show,
  update,
  destroy,
  getTBByCountry,
  getTBByCompany } from './controller'
import { schema } from './model'
export Taxbenifit, { schema } from './model'

const router = new Router()
const { name, country, company, region, position } = schema.tree

/**
 * @api {post} /taxbenifits Create taxbenifit
 * @apiName CreateTaxbenifit
 * @apiGroup Taxbenifit
 * @apiParam name Taxbenifit's name.
 * @apiParam country Taxbenifit's country.
 * @apiParam company Taxbenifit's company.
 * @apiParam region Taxbenifit's region.
 * @apiSuccess {Object} taxbenifit Taxbenifit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Taxbenifit not found.
 */
router.post('/',
  body({ name, country, company, region, position }),
  create)

/**
 * @api {get} /taxbenifits Retrieve taxbenifits
 * @apiName RetrieveTaxbenifits
 * @apiGroup Taxbenifit
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of taxbenifits.
 * @apiSuccess {Object[]} rows List of taxbenifits.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 */
router.get('/',
  query(),
  index)

/**
 * @api {get} /taxbenifits/:id Retrieve taxbenifit
 * @apiName RetrieveTaxbenifit
 * @apiGroup Taxbenifit
 * @apiSuccess {Object} taxbenifit Taxbenifit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Taxbenifit not found.
 */
router.get('/:id',
  show)

router.get('/country/:country',
  getTBByCountry)

  /**
 * @api {get} /retiralbenifits/county/:country /company/:company Retrieve retiralbenifits by country and Comp
 * @apiName RetrieveRetiralbenifitsByCountry
 * @apiGroup Retiralbenifits
 * @apiSuccess {Object} retiralbenifits Retiralbenifits's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Retiralbenifits not found.
 */
router.get('/country/:country/company/:company',
getTBByCompany)

/**
 * @api {put} /taxbenifits/:id Update taxbenifit
 * @apiName UpdateTaxbenifit
 * @apiGroup Taxbenifit
 * @apiParam name Taxbenifit's name.
 * @apiParam country Taxbenifit's country.
 * @apiParam company Taxbenifit's company.
 * @apiParam region Taxbenifit's region.
 * @apiSuccess {Object} taxbenifit Taxbenifit's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Taxbenifit not found.
 */
router.put('/:id',
  body({ name, country, company, region }),
  update)

/**
 * @api {delete} /taxbenifits/:id Delete taxbenifit
 * @apiName DeleteTaxbenifit
 * @apiGroup Taxbenifit
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Taxbenifit not found.
 */
router.delete('/:id',
  destroy)

export default router
