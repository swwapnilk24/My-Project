import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { BandsAndPlans } from '.'

export const show = ({ params }, res, next) =>
 BandsAndPlans.findById(params.id)
    .then(notFound(res))
    .then((bandsandplans) => bandsandplans ? bandsandplans.view() : null)
    .then(success(res))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
 BandsAndPlans.find(query, select, cursor)
    .then((bandsandplans) => bandsandplans.map((country) => country.view()))
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
    BandsAndPlans.findById(params.id)
        .then(notFound(res))
        .then((bandsandplans) => bandsandplans ? _.merge(bandsandplans, body).save() : null)
        .then((bandsandplans) => bandsandplans ? bandsandplans.view(true) : null)
        .then(success(res))
        .catch(next)

export const destroy = ({ params }, res, next) =>
    BandsAndPlans.findById(params.id)
        .then(notFound(res))
        .then((bandsandplans) => bandsandplans ? bandsandplans.remove() : null)
        .then(success(res, 204))
        .catch(next)  