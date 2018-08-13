import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Compensationplan } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
  body.employeeid = new mongoose.Types.ObjectId.createFromHexString(body.employeeid.replace("'",""));
  Compensationplan.create(body)
  .then((compensationplan) => compensationplan.view(true))
  .then(success(res, 201))
  .catch(next)
}
  

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Compensationplan.find(query, select, cursor)
    .then((compensationplans) => compensationplans.map((compensationplan) => compensationplan.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Compensationplan.findById(params.id)
    .then(notFound(res))
    .then((compensationplan) => compensationplan ? compensationplan.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) => {
  let employeeid = new mongoose.Types.ObjectId.createFromHexString(params.id.replace("'",""));
  Compensationplan.findOne({"employeeid":employeeid})
    .then(notFound(res))
    .then((compensationplan) => compensationplan ? _.merge(compensationplan, body).save() : null)
    .then((compensationplan) => compensationplan ? compensationplan.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) =>
  Compensationplan.findById(params.id)
    .then(notFound(res))
    .then((compensationplan) => compensationplan ? compensationplan.remove() : null)
    .then(success(res, 204))
    .catch(next)
