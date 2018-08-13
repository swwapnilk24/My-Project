import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { AppUser } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
AppUser.create(body)
    .then((appUser) => appUser.view(true))
    .then(success(res, 201))
    .catch(next)

export const show = ({ params }, res, next) => {
    AppUser.findById(params.id)
    .then(notFound(res))
    .then((appUsers) => appUsers ? appUsers.view() : null)
    .then(success(res))
    .catch(next)
}
export const index = ({ querymen: { query, select, cursor } }, res, next) => {
    AppUser.find(query, select, cursor)
    .then((appUsers) => appUsers.map((appUser) => appUser.view()))
    .then(success(res))
    .catch(next)
}