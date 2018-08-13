import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Meritgroup } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Meritgroup.create(body)
    .then((meritgroup) => meritgroup.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Meritgroup.find(query, select, cursor)
    .then((meritgroups) => meritgroups.map((meritgroup) => meritgroup.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Meritgroup.findById(params.id)
    .then(notFound(res))
    .then((meritgroup) => meritgroup ? meritgroup.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Meritgroup.findById(params.id)
    .then(notFound(res))
    .then((meritgroup) => meritgroup ? _.merge(meritgroup, body).save() : null)
    .then((meritgroup) => meritgroup ? meritgroup.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Meritgroup.findById(params.id)
    .then(notFound(res))
    .then((meritgroup) => meritgroup ? meritgroup.remove() : null)
    .then(success(res, 204))
    .catch(next)
