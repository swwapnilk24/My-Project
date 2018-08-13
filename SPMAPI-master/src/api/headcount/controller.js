import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Headcount } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 Headcount.create(body)
    .then((headcount) => headcount.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) =>
 Headcount.findById(params.id)
    .then(notFound(res))
    .then((headcount) => headcount ? headcount.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Headcount.find(query, select, cursor)
    .then((headcount) => headcount.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Headcount.findById(params.id)
        .then(notFound(res))
        .then((headcount) => headcount ? _.merge(headcount, body).save() : null)
        .then((headcount) => headcount ? headcount.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    Headcount.findById(params.id)
        .then(notFound(res))
        .then((headcount) => headcount ? headcount.remove() : null)
        .then(success(res, 204))
        .catch(next)  