import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { OrgHierarchy } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
    body.employeeid = mongoose.Types.ObjectId.createFromHexString(body.employeeid.replace("'",""));
    body.cpm_manager = mongoose.Types.ObjectId.createFromHexString(body.cpm_manager.replace("'",""));
    body.operational_manager = mongoose.Types.ObjectId.createFromHexString(body.operational_manager.replace("'",""));
    OrgHierarchy.create(body)
    .then((orghierarchy) => orghierarchy.view(true))
    .then(success(res, 201))
    .catch(next)
}


export const show = ({ params }, res, next) =>
OrgHierarchy.findById(params.id)
    .then(notFound(res))
    .then((orghierarchy) => orghierarchy ? orghierarchy.view() : null)
    .then(success(res))
    .catch(next)