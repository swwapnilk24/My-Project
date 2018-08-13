import { CompanySubscription } from '.';

// export const createSubscriptionPlan = (req, res, next) => {
//   CompanySubscription.create(req.body, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// };

// export const getSubscriptionPlans = (req, res, next) => {
//   CompanySubscription.find({}, (err, result) => {
//     if (err) {
//       res.send(err);
//     } else {
//       res.send(result);
//     }
//   });
// };

export const insertIntoSubscription = (req, res, next) => {
  const subData = {
    company: req.body.company,
    isActive: false
  };
  CompanySubscription.create(subData, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      next();
      // res.send(result);
    }
  });
};

