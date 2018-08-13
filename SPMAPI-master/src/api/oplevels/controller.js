import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Oplevels } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 Oplevels.create(body)
    .then((oplevels) => oplevels.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) =>
 Oplevels.findById(params.id)
    .then(notFound(res))
    .then((oplevels) => oplevels ? oplevels.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Oplevels.find(query, select, cursor)
    .then((oplevels) => oplevels.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Oplevels.findById(params.id)
        .then(notFound(res))
        .then((oplevels) => oplevels ? _.merge(oplevels, body).save() : null)
        .then((oplevels) => oplevels ? oplevels.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    Oplevels.findById(params.id)
        .then(notFound(res))
        .then((oplevels) => oplevels ? oplevels.remove() : null)
        .then(success(res, 204))
        .catch(next)  