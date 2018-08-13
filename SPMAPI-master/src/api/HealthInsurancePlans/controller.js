import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { HealthInsurancePlans } from '.'
import mongoose from 'mongoose';
import { env, mongo, port, ip } from './../../config'
const Url = 'http://localhost:9000/';


export const show = (data, res, next) => {
    const company = data.params.company_id;
    HealthInsurancePlans.find({ "company_id": company }, (err, result) => {
         if (err) {
             res.send(err);
         } else {
             res.send(result);
         }
    });
}

export const showPlans = (data, res, next) => {
    const company = data.params.company_id;
    HealthInsurancePlans.find({ "company_id": company }, { "healthInsurancePlans.plan": 1 }, (err, result) => {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
   });
};

export const create = (data, res, next) => {
    const query = { 
        "company_id": data.body.company_id
    }
    console.log(data.body.pdfData);
    fs.writeFile('smaple.xlsx', data.body.pdfData, (err) => {
           if (err) {
               res.send(err);
           } else {
                HealthInsurancePlans.findOneAndUpdate(query, data.body, { new: true, upsert: true }, (err, result) => {
                    if (err) {
                        res.send(err);
                    } else {
                        res.send(result);
                    }
            });
           }
    });
};

export const update = (req, res, next) => {
    const query = {
     "company_id": req.params.company_id    
    }
    
    HealthInsurancePlans.find(query, (err, resp) => {
      if (err) {
          res.send(err);
      } else {
          if (resp.length === 0) {
            HealthInsurancePlans.create(query, (error, response) => {
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
     const body = JSON.parse(req.body.data);
     body.pdfData = `${Url}${req.params.id}/${body.pdfData}`;
    HealthInsurancePlans.update(query, { $push: { healthInsurancePlans: body }}, (err, result) => {
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
    HealthInsurancePlans.update(query,   { $pull: {  healthInsurancePlans: { _id: rowid } } },
    { multi: false }, (err, resp) => {
        if (err) {
            res.send(err);
        } else {
            res.send({ message: 'successfull' });
        }
    })
    
};