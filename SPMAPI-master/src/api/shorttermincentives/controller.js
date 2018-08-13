import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { ShortTermIncentives } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
  body.employeeid = new mongoose.Types.ObjectId.createFromHexString(body.employeeid.replace("'",""));
  ShortTermIncentives.create(body)
     .then((shortTermIncentives) => shortTermIncentives.view(true))
     .then(success(res, 201))
     .catch(next)
}

export const show = ({ params }, res, next) =>
 ShortTermIncentives.findById(params.id)
    .then(notFound(res))
    .then((shortTermIncentives) => shortTermIncentives ? shortTermIncentives.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 ShortTermIncentives.find(query, select, cursor)
    .then((shortTermIncentives) => shortTermIncentives.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    ShortTermIncentives.findById(params.id)
        .then(notFound(res))
        .then((shortTermIncentives) => shortTermIncentives ? _.merge(shortTermIncentives, body).save() : null)
        .then((shortTermIncentives) => shortTermIncentives ? shortTermIncentives.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    ShortTermIncentives.findById(params.id)
        .then(notFound(res))
        .then((shortTermIncentives) => shortTermIncentives ? shortTermIncentives.remove() : null)
        .then(success(res, 204))
        .catch(next)  