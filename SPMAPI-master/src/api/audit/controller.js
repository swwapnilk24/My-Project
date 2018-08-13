import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Audit } from '.'

export const create = (data, res, next) => {
  console.log(JSON.stringify(data.body.employee));
  Audit.create(data.body.employee)
    .then((employee) => employee.view(false))
    .then(success(res, 201))
    .catch(next)
}

export const getEmployeeAuditData = (req, res) => {
   Audit.find({}, {_id:0, __v:0, createAt:0, updatedAt:0 },(err, resp) => {
     res.send(resp[0]);
   }).limit(1);  
};

export const getWorkerAuditData = (req, res) => {
  Audit.find({}, {}, (err, resp) => {
    res.send(resp);
  });
};

export const updateEmployeeAudit = (data, res, next) => {
  var query = {
    'entityInformation.owner': data.body.employee.entityInformation.owner,
    'entityInformation.status': data.body.employee.entityInformation.status,
    'entityInformation.customer': data.body.employee.entityInformation.customer,
    'entityInformation.employeeId': data.body.employee.entityInformation.employeeId
  };
  var projection = {
    _id: 0,
    __v: 0,
    createdAt: 0
  }
  Audit.findOneAndUpdate(query, data.body.employee, { projection: projection, new: true, upsert: true })
    .then((employee) => employee.view(true))
    .then(success(res, 201))
    .catch(next)

}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Audit.find(query, select, cursor)
    .then((employees) => employees.map((employee) => employee.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Audit.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.view() : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Audit.findById(params.id)
    .then(notFound(res))
    .then((employee) => employee ? employee.remove() : null)
    .then(success(res, 204))
    .catch(next)


