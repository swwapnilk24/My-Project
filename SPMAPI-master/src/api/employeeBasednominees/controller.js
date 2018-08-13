import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { EmployeeBasedNominees } from '.'
import mongoose from 'mongoose';

export const show = (data, res, next) => {
    EmployeeBasedNominees.find({}, (err, result) => {
         if (err) {
             res.send(err);
         } else {
             res.send(result);
         }
    });
}

export const create = (data, res, next) => {
    const query = { 
        "employeeId": data.body.employeeId
    }
    EmployeeBasedNominees.findOneAndUpdate(query, data.body, { new: true, upsert: true }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
   });
};

export const deleteRow = (data, res, next) => {
     // 5a67346f10836b37a8b38ddb
    const ObjectId = data.body._id;
    const id = new mongoose.Types.ObjectId.createFromHexString(ObjectId.replace("'",""));
    EmployeeBasedNominees.update({},   { $pull: {  nominees: { _id: id } } },
    { multi: false }, (err, resp) => {
        if (err) {
            res.send(err);
        } else {
            show(data, res, next);
        }
    })
    
};