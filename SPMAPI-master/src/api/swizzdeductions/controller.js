import { success, notFound } from '../../services/response/'
import { Swizzdeductions } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Swizzdeductions.create(body)
    .then((swizzdeductions) => swizzdeductions.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Swizzdeductions.count(query)
    .then(count => Swizzdeductions.find(query, select, cursor)
      .then((swizzdeductions) => ({
        count,
        rows: swizzdeductions.map((swizzdeductions) => swizzdeductions.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const getByDate = (req, res, next) => {
  Swizzdeductions.find({})
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
  Swizzdeductions.findById(params.id)
    .then(notFound(res))
    .then((swizzdeductions) => swizzdeductions ? swizzdeductions.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Swizzdeductions.findById(params.id)
    .then(notFound(res))
    .then((swizzdeductions) => swizzdeductions ? Object.assign(swizzdeductions, body).save() : null)
    .then((swizzdeductions) => swizzdeductions ? swizzdeductions.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Swizzdeductions.findById(params.id)
    .then(notFound(res))
    .then((swizzdeductions) => swizzdeductions ? swizzdeductions.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const bulkInsert = (req, res, next) => {
  Swizzdeductions.insertMany(req.body).then(response => {
    res.status(200).send('Inserted success')
  })
  .catch(err => {
    console.log(err)
    res.status(400).send('Failed to insert')
  })
}
