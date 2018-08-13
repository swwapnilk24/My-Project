import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { EmployeeTargets } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
    body.employeeid = new mongoose.Types.ObjectId.createFromHexString(body.employeeid.replace("'",""));
    body.plan = new mongoose.Types.ObjectId.createFromHexString(body.plan.replace("'", ""));
    // console.log(body.employeeid);
    // body.employeeid = new mongoose.Types.ObjectId.createFromHexString(body.plan.replace("'",""));
    EmployeeTargets.create(body)
    .then((employeetargets) => employeetargets.view(true))
    .then(success(res, 201))
    .catch(next)
} 

export const show = ({ params }, res, next) =>
 EmployeeTargets.findById(params.id)
    .then(notFound(res))
    .then((employeetargets) => employeetargets ? employeetargets.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 EmployeeTargets.find(query, select, cursor)
    .then((employeetargets) => employeetargets.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    EmployeeTargets.findById(params.id)
        .then(notFound(res))
        .then((employeetargets) => employeetargets ? _.merge(employeetargets, body).save() : null)
        .then((employeetargets) => employeetargets ? employeetargets.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    EmployeeTargets.findById(params.id)
        .then(notFound(res))
        .then((employeetargets) => employeetargets ? employeetargets.remove() : null)
        .then(success(res, 204))
        .catch(next)  