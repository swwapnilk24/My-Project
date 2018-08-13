import { Router } from 'express';
import { middleware as query } from 'querymen';
import { middleware as body } from 'bodymen';
import { token } from '../../services/passport';
import Model from './model';
const router = new Router();
router.post('/', function(req, res) {
    if (Object.keys(req.body).length === 0) {
        res.send("empty body");
    } else {
        if(req.body.errorDescriptor) {
            if (Object.keys(req.body.errorDescriptor).length === 0) {
            res.send("empty descriptor")
            } else {
                Model.create(req.body, function(err, response){
                    if (err) {
                        res.send(err);
                    } else {
                        res.send('saved');
                    }
                });
            }
       } else {
           res.send("invalid josn");
       }
        
   } 
});
router.get('/', function(req, res) {
  Model.find({}, function(err, response) {
        res.send(response);
  });
});
export default router;