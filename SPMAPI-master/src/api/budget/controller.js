import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Budget } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 Budget.create(body)
    .then((budget) => budget.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) =>
 Budget.findById(params.id)
    .then(notFound(res))
    .then((budget) => budget ? budget.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Budget.find(query, select, cursor)
    .then((budget) => budget.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Budget.findById(params.id)
        .then(notFound(res))
        .then((budget) => budget ? _.merge(budget, body).save() : null)
        .then((budget) => budget ? budget.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    Budget.findById(params.id)
        .then(notFound(res))
        .then((budget) => budget ? budget.remove() : null)
        .then(success(res, 204))
        .catch(next)  