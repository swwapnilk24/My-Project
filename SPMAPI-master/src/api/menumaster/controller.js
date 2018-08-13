import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { MenuMaster } from '.'

export const create = ({ bodymen: { body } }, res, next) => 
  MenuMaster.create(body)
    .then((menumaster) => menumaster.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  MenuMaster.find(query, select, cursor)
    .then((menumaster) => menumaster.map((menumaster) => menumaster.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  MenuMaster.findById(params.id)
    .then(notFound(res))
    .then((menumaster) => menumaster ? menumaster.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  MenuMaster.findById(params.id)
    .then(notFound(res))
    .then((menumaster) => menumaster ? _.merge(menumaster, body).save() : null)
    .then((menumaster) => menumaster ? menumaster.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  MenuMaster.findById(params.id)
    .then(notFound(res))
    .then((menumaster) => menumaster ? menumaster.remove() : null)
    .then(success(res, 204))
    .catch(next)
