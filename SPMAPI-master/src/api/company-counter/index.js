import { Router } from 'express';
import CompanyCounter, { schema } from './model';
export CompanyCounter, { schema } from './model';

const router = new Router()

router.post('/', (req, res) => {
  const query = {
    'companyId': req.body.id,
    'companyName': req.body.name
  };
  CompanyCounter.find(query, (err, resp) => {
       if(err) {
          res.send(err);
       } else {
          if(resp.length === 0) {
            getLastCount(req, res);
          } else {
            res.send({ nextCounterValue: resp[0].nextCounterValue });
          }
       }
    });
});

const getLastCount = (req, res) => {
  CompanyCounter.find({},{ nextCounterValue: 1 }, (err, resp) => {
    if (resp.length === 0) {
      create(100, req, res);
    } else {
      create(resp[0].nextCounterValue + 1, req, res);
    }
  }).sort({'_id':-1}).limit(1);
};

const create = (resp, req, res) => {
  console.log({ companyId: req.body.id, companyName: req.body.name, nextCounterValue: resp });
  CompanyCounter.create({ companyId: req.body.id, companyName: req.body.name, nextCounterValue: resp }, (err, suc) => {
    if (err) {
      res.send(err);
    } else {
      res.send(suc);
    }
   });
};

export default router;