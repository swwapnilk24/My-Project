import { success, notFound } from '../../services/response/'
import { Swisspayroll } from '.'

export const create = (req, res, next) =>
  Swisspayroll.create(req.body)
    .then((swisspayroll) => swisspayroll.view(true))
    .then(success(res, 201))
    .catch(next)

export const pushPayroll = (req, res, next) => {
  const id = req.body.id
  const payroll = req.body.payroll
  Swisspayroll
  .update({_id: id},
    {$addToSet: {payroll: payroll}},
    { safe: true, upsert: true }
  ).exec((err, employee) => {
    if (err) {
      next(err)
    }
    if (!employee) {
      next(new Error('No post with that id'))
    } else {
      // res.send({'message': 'sucessfully created'})
      Swisspayroll
      .find({_id: id,
        payroll: {$elemMatch: {'salaryYear': req.body.payroll.salaryYear,
          'salarymonth': req.body.payroll.salarymonth}
        }}).select('payroll').exec((err, payroll) => {
          if (err) {
            next(err)
          }
          res.send(payroll[0].payroll[0]._id)
        })
    }
  })
}

// Update Employee payroll array by object id in array
export const updateEmpPayroll = (req, res, next) => {
  const id = req.body.id
  const payrollId = req.body.payrollId
  const payroll = req.body.payroll

  Swisspayroll.findByIdAndUpdate(
    id,
   { $pull: { payroll: { _id: payrollId } } }, (err, model) => {
     if (err) {
       res.send(err)
     }
     Swisspayroll
     .update({_id: id},
       {$addToSet: {payroll: payroll}},
       { safe: true, upsert: true }
     ).exec((err, employee) => {
       if (err) {
         next(err)
       }
       if (!employee) {
         next(new Error('unable to delete payroll'))
       } else {
         // res.send({'message': 'sucessfully created'})
         Swisspayroll
         .find({_id: id,
           payroll: {$elemMatch: {'salaryYear': req.body.payroll.salaryYear,
             'salarymonth': req.body.payroll.salarymonth}
           }}).select('payroll').exec((err, payroll) => {
             if (err) {
               next(err)
             }
             res.send(payroll[0].payroll[0]._id)
           })
       }
     })
   })
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Swisspayroll.find(query, select, cursor)
    .then((swisspayrolls) => swisspayrolls.map((swisspayroll) => swisspayroll.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Swisspayroll.findById(params.id)
    .then(notFound(res))
    .then((swisspayroll) => swisspayroll ? swisspayroll.view() : null)
    .then(success(res))
    .catch(next)

export const payrollByCompany = ({ params }, res, next) => {
  Swisspayroll.find(params.companyid)
  .populate('company', 'corporateAddress')
  .exec()
  .then((payroll) => {
    if (!payroll) {
      next(new Error('No post with that id'))
    } else {
      res.send(payroll)
    }
  }, (err) => {
    next(err)
  })
}

export const generatedPayrollList = ({ params }, res, next) => {
  Swisspayroll.find({'company': params.companyid,
    'payroll.salaryYear': params.year,
    'payroll.salarymonth': params.month})
    .select('employee')
    .populate('employee', 'personalInformation jobInformation')
  .exec()
  .then((payroll) => {
    if (!payroll) {
      next(new Error('No post with that id'))
    } else {
      res.send(payroll)
    }
  }, (err) => {
    next(err)
  })
}

// get employee payroll object from array by object id
export const empPayrollbyYear = ({ params }, res, next) => {
  Swisspayroll.find({ 'employee': params.empid,
    'payroll.salaryYear': {
      $gte: params.startyear,
      $lt: params.endyear
    } },
  { 'payroll': 1 })
  .then((result) => {
    if (!result) {
      next(new Error('No post with that id'))
    } else {
      res.send(result[0].payroll)
    }
  }, (err) => {
    next(err)
  })
}
// get employee payroll object from array by object id
export const empPayrollbyMonth = ({ params }, res, next) => {
  Swisspayroll.find({ 'employee': params.id,
    'payroll.salaryYear': params.year,
    'payroll.salarymonth': params.month },
  { 'payroll.$': 1 })
  .then((result) => {
    if (!result) {
      next(new Error('No post with that id'))
    } else {
      res.send(result[0].payroll[0])
    }
  }, (err) => {
    next(err)
  })
}

export const payrollEmpList = ({ params }, res, next) => {
  Swisspayroll.find({'company': params.companyid,
    'payroll.salarymonth': { $ne: params.month }})
  .select('employee')
  .populate('employee', 'personalInformation jobInformation')
  .exec()
  .then((payroll) => {
    if (!payroll) {
      next(new Error('No post with that id'))
    } else {
      res.send(payroll)
    }
  }, (err) => {
    next(err)
  })
}

export const update = ({ bodymen: { body }, params }, res, next) =>
  Swisspayroll.findById(params.id)
    .then(notFound(res))
    .then((swisspayroll) => swisspayroll ? Object.assign(swisspayroll, body).save() : null)
    .then((swisspayroll) => swisspayroll ? swisspayroll.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Swisspayroll.findById(params.id)
    .then(notFound(res))
    .then((swisspayroll) => swisspayroll ? swisspayroll.remove() : null)
    .then(success(res, 204))
    .catch(next)
