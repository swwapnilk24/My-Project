import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { CompensationPlanning } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  CompensationPlanning.create(body)
    .then((compensationplanning) => compensationplanning.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  CompensationPlanning.find(query, select, cursor)
    .then((compensationplannings) => compensationplannings.map((compensationplanning) => compensationplanning.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  CompensationPlanning.findById(params.id)
    .then(notFound(res))
    .then((compensationplanning) => compensationplanning ? compensationplanning.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  CompensationPlanning.findById(params.id)
    .then(notFound(res))
    .then((compensationplanning) => compensationplanning ? _.merge(compensationplanning, body).save() : null)
    .then((compensationplanning) => compensationplanning ? compensationplanning.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  CompensationPlanning.findById(params.id)
    .then(notFound(res))
    .then((compensationplanning) => compensationplanning ? compensationplanning.remove() : null)
    .then(success(res, 204))
    .catch(next)
