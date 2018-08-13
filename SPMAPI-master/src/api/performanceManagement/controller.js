import _ from 'lodash'
import mongoose, { Schema } from 'mongoose'
import { success, notFound } from '../../services/response/'
import { PerformanceManagement } from '.'

// export const create = ({ bodymen: { body } }, res, next) => 
// PerformanceManagement.create(body)
//     .then((performanceManagement) => performanceManagement.view(true))
//     .then(success(res, 201))
//     .catch(next)

// export const create = (data, res, next) => {
//     const json = JSON.stringify(data.body);
//     const body = data.body;
//     console.log(data.body);
//     PerformanceManagement.create(body, (err, result) => {
//         if(err) {
//             res.send(err);
//         } else {
//             PerformanceManagement.find({}, (err, response) => {
//                 res.send(response[response.length-1]);
//             })
//         }
//     })
// }

export const create = (data, res, next) => {
    // console.log(JSON.stringify(data.body));
    //console.log(query, 'QUERY');
    // if(data.body.id == null) {
    //     const json = JSON.stringify(data.body);
    // const body = data.body;
    // console.log(data.body);
    // PerformanceManagement.create(body, (err, result) => {
    //     if(err) {
    //         res.send(err);
    //     } else {
    //         PerformanceManagement.find({}, (err, response) => {
    //             res.send(response[response.length-1]);
    //         })
    //     }
    // })
    // }
    // else{
        console.log(data.body.id);
        // data.body.id = new mongoose.Types.ObjectId.createFromHexString(data.body.id.replace("'",""));
        const query = {
            "_id": data.body.id
          }
        //   console.log(data.body.id);
          console.log(data.body);
        PerformanceManagement.findOneAndUpdate(query, data.body, {new: true, upsert: true})
          .then((performanceManagement) => performanceManagement.view(true))
          .then(success(res, 201))
          .catch(next)
    // } 
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
PerformanceManagement.find(query, select, cursor)
    .then((performanceManagement) => performanceManagement.map((performanceManagement) => performanceManagement.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
PerformanceManagement.findById(params.id)
    .then(notFound(res))
    .then((performanceManagement) => performanceManagement ? performanceManagement.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
PerformanceManagement.findById(params.id)
    .then(notFound(res))
    .then((performanceManagement) => performanceManagement ? _.merge(performanceManagement, body).save() : null)
    .then((performanceManagement) => performanceManagement ? performanceManagement.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
PerformanceManagement.findById(params.id)
    .then(notFound(res))
    .then((performanceManagement) => performanceManagement ? performanceManagement.remove() : null)
    .then(success(res, 204))
    .catch(next)
