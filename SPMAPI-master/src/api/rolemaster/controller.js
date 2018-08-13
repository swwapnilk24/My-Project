import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { RoleMaster } from '.'

export const create = ({ bodymen: { body } }, res, next) => 
  RoleMaster.create(body)
    .then((rolemaster) => rolemaster.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  RoleMaster.find(query, select, cursor)
    .then((rolemaster) => rolemaster.map((rolemaster) => rolemaster.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  RoleMaster.findById(params.id)
    .then(notFound(res))
    .then((rolemaster) => rolemaster ? rolemaster.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  RoleMaster.findById(params.id)
    .then(notFound(res))
    .then((rolemaster) => rolemaster ? _.merge(rolemaster, body).save() : null)
    .then((rolemaster) => rolemaster ? rolemaster.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  RoleMaster.findById(params.id)
    .then(notFound(res))
    .then((rolemaster) => rolemaster ? rolemaster.remove() : null)
    .then(success(res, 204))
    .catch(next)
