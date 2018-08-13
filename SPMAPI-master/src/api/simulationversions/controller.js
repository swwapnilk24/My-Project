import _ from 'lodash'
import mongoose from 'mongoose'
import { success, notFound } from '../../services/response/'
import { SimulationVersion } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
 body.employeeid = new mongoose.Types.ObjectId.createFromHexString(body.employeeid.replace("'","")); 
 SimulationVersion.create(body)
    .then((simulationVersion) => simulationVersion.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) =>
 SimulationVersion.findById(params.id)
    .then(notFound(res))
    .then((simulationVersion) => simulationVersion ? simulationVersion.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 SimulationVersion.find(query, select, cursor)
    .then((simulationVersion) => simulationVersion.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    SimulationVersion.findById(params.id)
        .then(notFound(res))
        .then((simulationVersion) => simulationVersion ? _.merge(simulationVersion, body).save() : null)
        .then((simulationVersion) => simulationVersion ? simulationVersion.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    SimulationVersion.findById(params.id)
        .then(notFound(res))
        .then((simulationVersion) => simulationVersion ? simulationVersion.remove() : null)
        .then(success(res, 204))
        .catch(next)  