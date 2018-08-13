import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Employee } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
  body.band = new mongoose.Types.ObjectId.createFromHexString(body.band.replace("'",""));
  Employee.create(body)
    .then((employee) => employee.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
Employee.find(query, select, cursor)
    .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? _.merge(employee, body).save() : null)
    .then((employee) => employee ? employee.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.remove() : null)
    .then(success(res, 204))
    .catch(next)


export const getEmpByBand = ({ params }, res, next) =>{
    var myObjectId = mongoose.Types.ObjectId(params.id);
    Employee.find({"band": myObjectId})
    .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)
}

