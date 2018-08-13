import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Employeeband } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
 Employeeband.create(body)
    .then((employeeband) => employeeband.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 Employeeband.find(query, select, cursor)
    .then((employeebands) => employeebands.map((employeeband) => employeeband.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
 Employeeband.findById(params.id)
    .then(notFound(res))
    .then((employeeband) => employeeband ? employeeband.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
 Employeeband.findById(params.id)
    .then(notFound(res))
    .then((employeeband) => employeeband ? _.merge(employeeband, body).save() : null)
    .then((employeeband) => employeeband ? employeeband.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
 Employeeband.findById(params.id)
    .then(notFound(res))
    .then((employeeband) => employeeband ? employeeband.remove() : null)
    .then(success(res, 204))
    .catch(next)
