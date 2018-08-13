import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { MenuMappingInfo } from '.'

export const create = ({ bodymen: { body } }, res, next) => 
  MenuMappingInfo.create(body)
    .then((menumappinginfo) => menumappinginfo.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  MenuMappingInfo.find(query, select, cursor)
    .then((menumappinginfo) => menumappinginfo.map((menumappinginfo) => menumappinginfo.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  MenuMappingInfo.findById(params.id)
    .then(notFound(res))
    .then((menumappinginfo) => menumappinginfo ? menumappinginfo.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  MenuMappingInfo.findById(params.id)
    .then(notFound(res))
    .then((menumappinginfo) => menumappinginfo ? _.merge(menumappinginfo, body).save() : null)
    .then((menumappinginfo) => menumappinginfo ? menumappinginfo.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  MenuMappingInfo.findById(params.id)
    .then(notFound(res))
    .then((menumappinginfo) => menumappinginfo ? menumappinginfo.remove() : null)
    .then(success(res, 204))
    .catch(next)
