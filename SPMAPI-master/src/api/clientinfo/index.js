import { Router } from 'express'
import { clientinfo } from './controller'
// import { passport } from 'passport'

const router = new Router()
// const { message } = ''

/**
 * @api {post} /chatbot Send Message
 * @apiName SendMessage
 * @apiGroup ChatBot
 * @apiPermission user
 * @apiParam {String} access_token user access token.
 * @apiParam message Message.
 * @apiSuccess {Object} chatbot Chatbot's response.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Message not found.
 */
router.get('/',
  clientinfo)

export default router
