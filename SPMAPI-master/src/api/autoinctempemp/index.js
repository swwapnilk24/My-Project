import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { schema } from './model'
import AutoInc from './model';
export AutoInc, { schema } from './model'
const router = new Router()
router.post('/', (req, res) => {
    const query = {
        'employeeObjId': req.body.employeeObjId,
        'employeeId':req.body.employeeId,
    }
    AutoInc.find(query,(err, resp) => {
       if(err) {
           res.send(err);
       } else {
          if(resp.length === 0) {
             getLastCount(req,res);
          } else {
              res.send({ nextCounterValue: resp[0].nextCounterValue });
          }
       }
    });
});
const getLastCount = (req,res) => {
  AutoInc.find({},{ nextCounterValue: 1}, (err, resp) => {
    if (resp.length === 0) {
        create(100,req, res);
    } else {
        create(resp[0].nextCounterValue + 1,req, res);
    }
     
  }).sort({'_id':-1}).limit(1)
};
const create = (resp,req, res) => {
   AutoInc.create({employeeObjId: req.body.employeeObjId,employeeId: req.body.employeeId, nextCounterValue: resp },(err, suc) => {
     if (err) {
         res.send(err);
     } else {
         res.send({ nextCounterValue: resp });
     }
   });
};
export default router;