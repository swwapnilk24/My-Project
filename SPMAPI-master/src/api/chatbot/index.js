import { Router } from 'express'
// import { middleware as body } from 'bodymen'
import { token } from '../../services/passport'
import { sendchat } from './controller'

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
router.get('/:msg',
  token({ required: true }),
  sendchat)

export default router
