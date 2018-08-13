import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { create, index, show, update, destroy, showCompany, findCompany, createNewCompany, showCompanyBasedonId, activateCompany } from './controller'
import { schema } from './model'
import { verifyCaptcha } from '../../services/recaptcha/index';
import { insertIntoSubscription } from '../company-subscription/controller'
import { master } from '../../services/passport'
import { create as createUser } from '../user/controller';
export Company, { schema } from './model';

const router = new Router()
const { corporateAddress, registeredEmail } = schema.tree

/**
 * @api {post} /companies Create company
 * @apiName CreateCompany
 * @apiGroup Company
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Company's name.
 * @apiParam address Company's address.
 * @apiParam website Company's website.
 * @apiSuccess {Object} company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 admin access only.
 */
router.post('/',
  // token({ required: false, roles: ['admin'] }),
  // body({ corporateAddress }),
  create)

router.post('/new', 
  createNewCompany)

/**
 * @api {get} /companies Retrieve companies
 * @apiName RetrieveCompanies
 * @apiGroup Company
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} companies List of companies.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  token({ required: false, roles: ['admin'] }),
  query(),
  index)
router.post('/showCompany', 
token({ required: false, roles: ['admin'] }), showCompany);
router.get('/:id', showCompanyBasedonId);
/**
 * @api {get} /companies/:id Retrieve company
 * @apiName RetrieveCompany
 * @apiGroup Company
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  token({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /companies/:id Update company
 * @apiName UpdateCompany
 * @apiGroup Company
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiParam name Company's name.
 * @apiParam address Company's address.
 * @apiParam website Company's website.
 * @apiSuccess {Object} company Company's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Company not found.
 * @apiError 401 admin access only.
 */
router.put('/:id',
  token({ required: true, roles: ['admin'] }),
  body({ corporateAddress }),
  update)

router.put('/emailauth/:id',
activateCompany)  

/**
 * @api {delete} /companies/:id Delete company
 * @apiName DeleteCompany
 * @apiGroup Company
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Company not found.
 * @apiError 401 admin access only.
 */
router.delete('/:id',
  token({ required: true, roles: ['admin'] }),
  destroy)

router.post('/findCompany',
  // verifyCaptcha,
  findCompany,
  createNewCompany,
  insertIntoSubscription,
  master(),
  createUser
);


export default router
