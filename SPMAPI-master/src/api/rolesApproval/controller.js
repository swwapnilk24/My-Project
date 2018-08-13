import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { RoleApproval } from '.'

export const create = (req, res, next) => {
  console.log(req.body);
  res.send(req.body);
  RoleApproval.create(req.body)
    .then((roleapproval) => roleapproval.view(true))
    .then(success(res, 201))
    .catch(next)
}
    

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  RoleApproval.find(query, select, cursor)
    .then((roleapproval) => roleapproval.map((roleapproval) => roleapproval.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  RoleApproval.findById(params.id)
    .then(notFound(res))
    .then((roleapproval) => roleapproval ? roleapproval.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  RoleApproval.findById(params.id)
    .then(notFound(res))
    .then((roleapproval) => roleapproval ? _.merge(roleapproval, body).save() : null)
    .then((roleapproval) => roleapproval ? roleapproval.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  RoleApproval.findById(params.id)
    .then(notFound(res))
    .then((roleapproval) => roleapproval ? roleapproval.remove() : null)
    .then(success(res, 204))
    .catch(next)
