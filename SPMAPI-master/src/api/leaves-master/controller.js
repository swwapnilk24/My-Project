import _ from 'lodash';
import mongoose from 'mongoose';
import { success, notFound } from '../../services/response/';
import { LeavesMasterData } from '.';

export const create = (data, res, next) => {
  console.log(data.body);
   LeavesMasterData.create(data.body)
    .then((leavesData) => leavesData.view(true))
    .then(success(res, 201))
    .catch(next)
}

export const show = ({ params }, res, next) => {
  LeavesMasterData.find({}, { __v: 0, createdAt: 0, updatedAt: 0 }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

export const update = ({ bodymen: { body }, params }, res, next) => {
  LeavesMasterData.findById(params.id)
    .then(notFound(res))
    .then((leavesData) => leavesData ? _.merge(leavesData, body).save() : null)
    .then((leavesData) => leavesData ? leavesData.view(true) : null)
    .then(success(res))
    .catch(next)
}

export const destroy = ({ params }, res, next) => {
  LeavesMasterData.findById(params.id)
    .then(notFound(res))
    .then((leavesData) => leavesData ? leavesData.remove() : null)
    .then(success(res, 204))
    .catch(next)
}

export const updateLeavesMasterData = (data, res, next) => {
  const query = {
    'leavesMasterData._id': data.body.leavesMasterData._id
  };
  // console.log(query);
  // console.log(data.body);
  const projection = {
    _id: 0,
    __v: 0,
    createdAt: 0
  };
  LeavesMasterData.findOneAndUpdate(query, data.body, { projection: projection, new: true, upsert: true }, (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      LeavesMasterData.find({}, { __v: 0, createdAt: 0, updatedAt: 0 }, (error, response) => {
        if (err) {
          res.send(err);
        } else {
          res.send(response);
        }
      });
    }
  })
    
  // if (!data.body.leavesMasterData._id) {
  //   LeavesMasterData.create(data.body)
  //     .then((leavesData) => leavesData.view(true))
  //     .then(success(res, 201))
  //     .catch(next)  
  // } else {
  //   LeavesMasterData.findOneAndUpdate(query, data.body, { projection: projection, new: true, upsert: true })
  //     .then((leavesData) => leavesData.view(true))
  //     .then(success(res, 201))
  //     .catch(next)
  // }
}
  