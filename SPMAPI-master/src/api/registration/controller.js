import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Registration } from '.'

export const create = ({ bodymen: { body } }, res, next) => {
  Registration.create(body)
    .then((registration) => registration.view(true))
    .then(success(res, 201))
    .catch(next)
}
export const show = ({ params }, res, next) => {
    Registration.findById(params.id)
    .then(notFound(res))
    .then((registration) => registration ? registration.view() : null)
    .then(success(res))
    .catch(next)
}
export const index = ({ querymen: { query, select, cursor } }, res, next) => {
    Registration.find(query, select, cursor)
    .then((registrations) => registrations.map((registration) => registration.view()))
    .then(success(res))
    .catch(next)
}