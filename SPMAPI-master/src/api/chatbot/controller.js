import {success, notFound} from '../../services/response/'
// import {createTestAccount} from '../helpers/mailhelper'

exports.sendchat = function (req, res, next) {
  const {Wit, log} = require('node-wit')
  const client = new Wit({
    accessToken: 'WKLYI7XOIQMAOP4AMVN4C6W5WW56REIK',
    logger: new log.Logger(log.DEBUG) // optional
  })
  // const resp = {   test: client.message(req.params.msg) } return success(res,
  // 201)

  client
    .message(req.params.msg, {})
    .then((data) => {
      res.json(data)
      // createTestAccount()
    })
    .catch(console.error)
}
