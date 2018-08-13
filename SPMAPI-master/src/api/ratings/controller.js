import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Ratings } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 Ratings.create(body)
    .then((ratings) => ratings.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) =>
 Ratings.findById(params.id)
    .then(notFound(res))
    .then((ratings) => ratings ? ratings.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Ratings.find(query, select, cursor)
    .then((ratings) => ratings.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    Ratings.findById(params.id)
        .then(notFound(res))
        .then((ratings) => ratings ? _.merge(ratings, body).save() : null)
        .then((ratings) => ratings ? ratings.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    Ratings.findById(params.id)
        .then(notFound(res))
        .then((ratings) => ratings ? ratings.remove() : null)
        .then(success(res, 204))
        .catch(next)  