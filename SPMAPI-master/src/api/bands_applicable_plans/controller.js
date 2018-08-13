import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import Band_Applicable_plan from './model';
import mongoose from 'mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
    //console.log('Object Conversion', body);
    body.plan = new mongoose.Types.ObjectId.createFromHexString(body.plan.replace("'",""));
    // console.log('Object Conversion', body.plan);
    body.band = new mongoose.Types.ObjectId.createFromHexString(body.band.replace("'",""));
    Band_Applicable_plan.create(body)
    .then((bands_applicable_plans) => bands_applicable_plans.view(true))
    .then(success(res, 201))
    .catch(next)
}
export const update = ({ bodymen: { body }, params }, res, next) => {
    body.plan = new mongoose.Types.ObjectId.createFromHexString(body.plan.replace("'",""));
    body.band = new mongoose.Types.ObjectId.createFromHexString(body.band.replace("'",""));
    Band_Applicable_plan.findById(body)
    .then(notFound(res))
    .then((bands_applicable_plans) => bands_applicable_plans ? _.merge(bands_applicable_plans, body).save() : null)
    .then((bands_applicable_plans) => bands_applicable_plans ? bands_applicable_plans.view(true) : null)
    .then(success(res))
    .catch(next)
}
export const show = ({ params }, res, next) =>
Band_Applicable_plan.findById(params.id)
    .then(notFound(res))
    .then((bands_applicable_plans) => bands_applicable_plans ? bands_applicable_plans.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
Band_Applicable_plan.find(query, select, cursor)
    .then((bands_applicable_plans) => bands_applicable_plans.map((country) => country.view()))
    .then(success(res))
    .catch(next)
    
export const destroy = ({ params }, res, next) =>
Band_Applicable_plan.findById(params.id)
        .then(notFound(res))
        .then((bands_applicable_plans) => bands_applicable_plans ? bands_applicable_plans.remove() : null)
        .then(success(res, 204))
        .catch(next)  