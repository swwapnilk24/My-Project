import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { NominationPlan } from '.'
import mongoose from 'mongoose'

export const create = ({ bodymen: { body } }, res, next) => {
    body.bandId = mongoose.Types.ObjectId.createFromHexString(body.bandId.replace("'",""));
    body.planId = mongoose.Types.ObjectId.createFromHexString(body.planId.replace("'",""));
    // body.operational_manager = mongoose.Types.ObjectId.createFromHexString(body.operational_manager.replace("'",""));
    NominationPlan.create(body)
    .then((nominationPlan) => nominationPlan.view(true))
    .then(success(res, 201))
    .catch(next)
}
