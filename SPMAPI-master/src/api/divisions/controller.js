import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Divisions } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 Divisions.create(body)
    .then((divisions) => divisions.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) =>
 Divisions.findById(params.id)
    .then(notFound(res))
    .then((divisions) => divisions ? divisions.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Divisions.find(query, select, cursor)
    .then((divisions) => divisions.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Divisions.findById(params.id)
        .then(notFound(res))
        .then((divisions) => divisions ? _.merge(divisions, body).save() : null)
        .then((divisions) => divisions ? divisions.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    Divisions.findById(params.id)
        .then(notFound(res))
        .then((divisions) => divisions ? divisions.remove() : null)
        .then(success(res, 204))
        .catch(next)  