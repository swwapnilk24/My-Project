import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Employee } from '.'
import AutoIncModel from '../autoinctempemp/model';
export const create = (data, res, next) => {
    console.log(JSON.stringify(data.body.employee));
    Employee.create(data.body.employee)
        .then((employee) => employee.view(false))
        .then(success(res, 201))
        .catch(next)
}

export const updateNewEmployee = (data, res, next) => {
    //console.log(JSON.stringify(data.body.employee));
    var query = {
          'entityInformation.owner': data.body.employee.entityInformation.owner,
          'entityInformation.status': data.body.employee.entityInformation.status,
          'entityInformation.customer': data.body.employee.entityInformation.customer,
    };
    //console.log(query, 'QUERY');
    Employee.findOneAndUpdate(query, data.body.employee, {new: true, upsert: true})
      .then((employee) => employee.view(true))
      .then(success(res, 201))
      .catch(next)
}

export const findNewEmployee = (data, res, next) => {
  //console.log(JSON.stringify(data.body.employee));
  var query = {
    'entityInformation.owner': data.body.employee.entityInformation.owner,
    'entityInformation.status': data.body.employee.entityInformation.status,
    'entityInformation.customer': data.body.employee.entityInformation.customer,
  };
  //console.log(query, 'QUERY');
  //Employee.findOne(query, function(err,obj) { console.log(obj,'FIND_RESULT'); });
  Employee.findOne(query)
    .then((employee) => employee ? employee.view(true) : updateNewEmployee(data, res, next))
    .then(success(res))
    .catch(next)
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Employee.find(query, select, cursor)
    .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? _.merge(employee, body).save() : null)
    .then((employee) => employee ? employee.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Employee.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const showEmpData = (data, res, next) => {
  Employee.find({}, function(err, empDtls) {
    if(err)
      throw err
    else
      res.json(empDtls)
  })
}

export const listOfMyEmployees = (data, res, next) => {
  Employee.find({},{__v:0, createdAt:0, updatedAt:0},function(err, resultSet) {
    if(err)
      throw err
    else
      res.json(resultSet)
  })
  // console.log(params);
}

export const getLastEmployeeData = (data, res,next) => {
  Employee.find({}, {
    "personalInformation.biographicalInformation.biographicalInformation.employeeId": 1
  }).sort({'_id':-1}).limit(1)
  // .then((employees) => employees.map((employee) => employee.view()))
  .then(success(res))
  .catch(next)

  // Employee.find({},{"personalInformation.biographicalInformation.biographicalInformation.employeeId": 1}, function(err, empDtls) {
  //   if(err)
  //     throw err
  //   else
  //     res.json(empDtls)
  // })
}

//Get table top record 
export const getFirstRecordData = (data, res, next) => {
  Employee.find({"personalInformation.biographicalInformation.biographicalInformation.employeeId": data.params.id})
          .sort({_id:1}).limit(1)
          .then(success(res))
          .catch(next)
}
