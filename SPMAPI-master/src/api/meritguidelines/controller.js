import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { MeritGuideLines } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 MeritGuideLines.create(body)
    .then((meritguidelines) => meritguidelines.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) =>
 MeritGuideLines.findById(params.id)
    .then(notFound(res))
    .then((meritguidelines) => meritguidelines ? meritguidelines.view() : null)
    .then(success(res))
    .catch(next)

export const showSpecificYearResults = ({ params }, res, next) =>
MeritGuideLines.findById(params.performance_year)
   .then(notFound(res))
   .then((meritguidelines) => meritguidelines ? meritguidelines.view() : null)
   .then(success(res))
   .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 MeritGuideLines.find(query, select, cursor)
    .then((meritguidelines) => meritguidelines.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    MeritGuideLines.findById(params.id)
        .then(notFound(res))
        .then((meritguidelines) => meritguidelines ? _.merge(meritguidelines, body).save() : null)
        .then((meritguidelines) => meritguidelines ? meritguidelines.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    MeritGuideLines.findById(params.id)
        .then(notFound(res))
        .then((meritguidelines) => meritguidelines ? meritguidelines.remove() : null)
        .then(success(res, 204))
        .catch(next)  