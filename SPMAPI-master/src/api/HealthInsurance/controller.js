import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { HealthInsurance } from '.'
import mongoose from 'mongoose';
import Company from '../company/model';
import HealthInsPlans from '../HealthInsurancePlans/model';

export const show = (data, res, next) => {
    const company = data.params.company_id;
    HealthInsurance.find({ "company_id": company }, (err, result) => {
         if (err) {
             res.send(err);
         } else {
             res.send(result);
         }
    });
}

export const create = (data, res, next) => {
    const query = { 
        "company_id": data.body.company_id
    }
    HealthInsurance.findOneAndUpdate(query, data.body, { new: true, upsert: true }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
   });
};

export const update = (req, res, next) => {
    const id = new mongoose.Types.ObjectId.createFromHexString(req.params.company_id.replace("'",""));
   const query = {
    "company_id": id    
   }
   HealthInsurance.find(query, (err, resp) => {
     if (err) {
         res.send(err);
     } else {
         if (resp.length === 0) {
          HealthInsurance.create(query, (error, response) => {
             if (error) {
                 res.send(err);
             } else {
                updateFunc(query, req, res, next);
             }
          });
         } else {
            updateFunc(query, req, res, next);
         }
     }
   });
};

export const updateFunc = (query, req, res, next)  => {
       HealthInsurance.update(query, { $push: { healthInsuranceBenefits: req.body }}, (err, result) => {
            if (err) {
                res.send('error');
            } else {
                show(req, res, next);
            }
        });
}

export const deleteRow = (req, res, next) => {
     // 5a67346f10836b37a8b38ddb
    const company_id = req.params.company_id;
    const rowid = req.params.rowId;
    const query = {
        "company_id": req.params.company_id    
       }
    HealthInsurance.update(query,   { $pull: {  healthInsuranceBenefits: { _id: rowid } } },
    { multi: false }, (err, resp) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'successfull' });
        }
    })
    
};

export const planDataForEmployee = (req, res, next) => {
    const companyid = req.params.company;
    const workingCompany = req.params.workCompany;
    const position = req.params.position;
    Company.find({ "_id": companyid }, { "corporateAddress._id": 1, "corporateAddress.country": 1 }, (err, resp) => {
        if (err) {
            res.send(err);
        } else {
           if (resp.length > 0) {
            console.log(workingCompany.toString(), resp[0].corporateAddress._id.toString());
            if (workingCompany.toString() === resp[0].corporateAddress._id.toString()) {
                // res.send(resp[0].corporateAddress.country);
                findPlanForThePosition(companyid, position, resp[0].corporateAddress.country, res, next);
            } else {
                Company.find({ "branches._id": workingCompany }, {"branches.$" : 1 }, (error, response) => {
                    if (response.length > 0) {
                        // res.send(response[0].branches[0].country);
                        findPlanForThePosition(companyid, position, response[0].branches[0].country, res, next);
                    } else {
                        res.send({ message: 'no branch found' });
                    }
                   
                });
            }
           } else {
             res.send({ message: 'no company found' });
           }
        }
    });
}

const findPlanForThePosition = (companyid, position, countryOfCompany, res, next) => {
    HealthInsurance.aggregate([
        {
            $match :{  "company_id": { $eq: new mongoose.Types.ObjectId.createFromHexString(companyid.replace("'","")) }}
            },
        {
           
           $project: {
              "healthInsuranceBenefits" : {
                 $filter: {
                    input: "$healthInsuranceBenefits",
                    as: "item",
                    cond: { $and: [{$eq: [ "$$item.country", countryOfCompany ] }, { $eq: [ "$$item.empPosition", position ] }]}
                 }
              }
           }
        }
        
     ], (err, response) => {
        if (err) {
            response.send(err);
         } else {
            if (response.length > 0 ) {
                sendPlanDetails(companyid, response[0].healthInsuranceBenefits[0].plan, res, next);
            } else {
                res.send({ message: 'no plans found' });
            }
         }
     });
}

const sendPlanDetails = (companyid, plan, res, next) => {
    HealthInsPlans.aggregate([
        {
            $match :{  "company_id": { $eq: new mongoose.Types.ObjectId.createFromHexString(companyid.replace("'","")) }}
            },
        {
           
           $project: {
              "healthInsurancePlans" : {
                 $filter: {
                    input: "$healthInsurancePlans",
                    as: "item",
                    cond: { $and: [{ $eq: [ "$$item.plan", plan ] }]}
                 }
              }
           }
        }
        
     ], (err, resp) => {
        if (err) {
            res.send(err);
        } else {
            if (resp.length > 0) {
                res.send({ message: 'successfull', response: resp[0].healthInsurancePlans });
            } else {
                res.send({ message: 'no plans data found' });
            }
        }
     });
}