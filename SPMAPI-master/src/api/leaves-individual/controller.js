import mongoose from 'mongoose';
import { LeavesIndividual } from '.';

export const create = (data, res, next) => {
  console.log(data.body);
  LeavesIndividual.create(data.body, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

export const show = ({ params }, res, next) => {
  LeavesIndividual.find({}, { __v: 0, createdAt: 0, updatedAt: 0 }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};
