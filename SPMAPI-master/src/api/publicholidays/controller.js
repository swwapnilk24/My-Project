import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { PublicHolidays } from '.'
// import mongoose, { Schema } from 'mongoose'

// export const create = ({ bodymen: { body } }, res, next) => {
//   console.log(body);
//   PublicHolidays.create(body)
//     .then((publicholidays) => publicholidays.view(true))
//     .then(success(res, 201))
//     .catch(next)
// }

export const create = (data, res, next) => {
  // console.log(JSON.stringify(data.body));
  //console.log(query, 'QUERY');
  // data.body.id = new mongoose.Types.ObjectId.createFromHexString(data.body.id.replace("'",""));
  const query = {
      "_id": data.body.id
    }
    console.log(data.body.id);
    console.log(data.body);
    PublicHolidays.findOneAndUpdate(query, data.body, {new: true, upsert: true})
    .then((publicholidays) => publicholidays.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  PublicHolidays.find(query, select, cursor)
    .then((publicholidays) => publicholidays.map((publicholidays) => publicholidays.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) => {
  console.log(params);
  PublicHolidays.findById(params.id)
    .then(notFound(res))
    .then((publicholidays) => publicholidays ? publicholidays.view() : null)
    .then(success(res))
    .catch(next)
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  PublicHolidays.findById(params.id)
    .then(notFound(res))
    .then((publicholidays) => publicholidays ? _.merge(publicholidays, body).save() : null)
    .then((publicholidays) => publicholidays ? publicholidays.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  PublicHolidays.findById(params.id)
    .then(notFound(res))
    .then((publicholidays) => publicholidays ? publicholidays.remove() : null)
    .then(success(res, 204))
    .catch(next)
