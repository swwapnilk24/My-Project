import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Actualspent } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 Actualspent.create(body)
    .then((actualspent) => actualspent.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Actualspent.find(query, select, cursor)
    .then((actualspents) => actualspents.map((actualspent) => actualspent.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
 Actualspent.findById(params.id)
    .then(notFound(res))
    .then((actualspent) => actualspent ? actualspent.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
 Actualspent.findById(params.id)
    .then(notFound(res))
    .then((actualspent) => actualspent ? _.merge(actualspent, body).save() : null)
    .then((actualspent) => actualspent ? actualspent.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
 Actualspent.findById(params.id)
    .then(notFound(res))
    .then((actualspent) => actualspent ? actualspent.remove() : null)
    .then(success(res, 204))
    .catch(next)
