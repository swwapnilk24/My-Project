import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { TargetPlans } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
TargetPlans.create(body)
    .then((targetplans) => targetplans.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) =>
TargetPlans.findById(params.id)
    .then(notFound(res))
    .then((targetplans) => targetplans ? targetplans.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
TargetPlans.find(query, select, cursor)
    .then((targetplans) => targetplans.map((plans) => plans.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
TargetPlans.findById(params.id)
        .then(notFound(res))
        .then((targetplans) => targetplans ? _.merge(targetplans, body).save() : null)
        .then((targetplans) => targetplans ? targetplans.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
TargetPlans.findById(params.id)
        .then(notFound(res))
        .then((targetplans) => targetplans ? targetplans.remove() : null)
        .then(success(res, 204))
        .catch(next)  