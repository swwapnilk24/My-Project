import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Orgchart } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Orgchart.create(body)
    .then((orgchart) => orgchart.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Orgchart.find(query, select, cursor)
    .then((orgcharts) => orgcharts.map((orgchart) => orgchart.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Orgchart.findById(params.id)
    .then(notFound(res))
    .then((orgchart) => orgchart ? orgchart.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Orgchart.findById(params.id)
    .then(notFound(res))
    .then((orgchart) => orgchart ? _.merge(orgchart, body).save() : null)
    .then((orgchart) => orgchart ? orgchart.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Orgchart.findById(params.id)
    .then(notFound(res))
    .then((orgchart) => orgchart ? orgchart.remove() : null)
    .then(success(res, 204))
    .catch(next)
