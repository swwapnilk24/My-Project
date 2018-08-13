import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { LeavesAudit } from '.'

export const updateLeavesAudit = (request, res, next) => {
  console.log(request.params.id);
  // console.log(request.body.leavesAudit);
  // let query = '';
  // if (request.params.id === undefined) {
  //   query = {};
  // } else {
  //   query = {
  //     "_id": request.params.id
  //   };
  // }
  const query = {};
  const update = {
    $push: {
      leavesAudit: {
        $each: [{
          country: request.body.leavesAudit.country,
          role: request.body.leavesAudit.role,
          timeOffType: request.body.leavesAudit.timeOffType,
          numberOfDays: request.body.leavesAudit.numberOfDays,
          yearStartDate: request.body.leavesAudit.yearStartDate,
          yearEndDate: request.body.leavesAudit.yearEndDate,
          status: request.body.leavesAudit.status,
          insertedBy: request.body.leavesAudit.insertedBy,
          insertedDate: request.body.leavesAudit.insertedDate,
          operation: request.body.leavesAudit.operation
        }]
      }
    }
  }
  LeavesAudit.findOneAndUpdate(query, update, { new: true, upsert: true }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  })
}

export const getLeavesAudit = (req, res) => {
  LeavesAudit.find({}, { __v: 0, createAt: 0, updatedAt: 0 }, (err, result) => {
    res.send(result[0]);
  }).limit(1);
};
