import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Company } from '.'
// import CompanyCounter, { schema } from '../company-counter/model';
import CompanySubscription from '../company-subscription/model';
import RegToken from '../registration-tokens/model';

export const create = (req, res, next) => {
  //res.send(req.body);
  console.log(req.body);
  const query = {
    "corporateAddress.companyName": req.body.corporateAddress.companyName
  }
  Company.findOneAndUpdate(query,req.body,{ new: true, upsert: true}, (err, resp) => {
          if (err) {
            res.send('validations error');
          } else {
            res.send(resp);
          }
  });
    // .then((company) => company.view(true))
    // .then(success(res, 201))
    // .catch(next)
}

export const createNewCompany = (req, res, next) => {
  const company = {
    corporateAddress: {
      companyName: req.body.company
    },
    registeredEmail: req.body.email
  };
  Company.create(company, (err, result) => {
    if (err) {
      res.send(err)
    } else {
      req.body.company = result['_id'];
      next();
      // res.send(result);
    }
  });
};

export const showCompany = (data, res, next) => {
  Company.find({ "corporateAddress.companyName":"Mcbitss" }, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  })
};

export const showCompanyBasedonId = (req, res, next) => {
  Company.find({ "_id": req.params.id }, (err, resp) => {
    if (err) {
      res.send(err);
    } else {
      res.send(resp);
    }
  })
}
export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Company.find(query, select, cursor)
    .then((companies) => companies.map((company) => company.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Company.findById(params.id)
    .then(notFound(res))
    .then((company) => company ? company.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) => {
  Company.findById(params.id)
    .then(notFound(res))
    .then((company) => company ? _.merge(company, body).save() : null)
    .then((company) => company ? company.view(true) : null)
    .then(success(res))
    .catch(next)
}
  

export const destroy = ({ params }, res, next) =>
  Company.findById(params.id)
    .then(notFound(res))
    .then((company) => company ? company.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const findCompany = (req, res, next) => {
  // console.log(req.body);
  const query = {
   $or: [
    { "corporateAddress.companyName": { $regex: new RegExp(`^${req.body.company}$`, 'i') } },
    { "registeredEmail": req.body.email }
  ]};
  Company.find(query, (err, response) => {
    if (err) {
      res.send(err);
    } else if (response[0]) {
      res.send({ isNewCompany: false });
    } else {
      req.body.isNewCompany = true;
      next();
      // res.send({ doesntExist: true });
    }
  });
};

export const activateCompany = (req, res, next) => {
  RegToken.find({ token: req.params.id }, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      // console.log(result)
      const companyId = result[0].company;
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 30);
      CompanySubscription.update(
        { company: companyId},
        { $set: 
          { 
            'isActive': true,
            'startDate': new Date(),
            'endDate': endDate
          } }, { new: true, multi: false }, (error, response) => {
          if  (error) {
            res.send(error);
          } else {
            res.send(response);
          }
        }
      )
    }
  }).limit(1);
}