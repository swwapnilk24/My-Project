import { success, notFound } from '../../services/response/'
import { SwissCompensation } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  SwissCompensation.create(body)
    .then((SwissCompensation) => SwissCompensation.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  SwissCompensation.count(query)
    .then(count => SwissCompensation.find(query, select, cursor)
      .then((SwissCompensation) => ({
        count,
        rows: SwissCompensation.map((SwissCompensation) => SwissCompensation.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const getByDate = (req, res, next) => {
  SwissCompensation.find({})
  .sort({createdAt: 1})
  .exec((err, deductions) => {
    if (err) {
      next(err)
    }
    if (!deductions) {
      next(new Error('No post with that id'))
    } else {
      res.send(deductions)
    }
  })
}

export const show = ({ params }, res, next) =>
  SwissCompensation.findById(params.id)
    .then(notFound(res))
    .then((SwissCompensation) => SwissCompensation ? SwissCompensation.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  SwissCompensation.findById(params.id)
    .then(notFound(res))
    .then((SwissCompensation) => SwissCompensation ? Object.assign(SwissCompensation, body).save() : null)
    .then((SwissCompensation) => SwissCompensation ? SwissCompensation.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  SwissCompensation.findById(params.id)
    .then(notFound(res))
    .then((SwissCompensation) => SwissCompensation ? SwissCompensation.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const bulkInsert = (req, res, next) => {
  SwissCompensation.insertMany(req.body).then(response => {
    res.status(200).send('Inserted success')
  })
  .catch(err => {
    console.log(err)
    res.status(400).send('Failed to insert')
  })
}
