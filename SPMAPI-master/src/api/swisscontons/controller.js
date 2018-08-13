import { success, notFound } from '../../services/response/'
import { Swisscontons } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Swisscontons.create(body)
    .then((swisscontons) => swisscontons.view(true))
    .then(success(res, 201))
    .catch(next)

export const insertMany = (req, res, next) => {
  Swisscontons.insertMany(req.body).then(response => {
    res.status(200).send('Inserted new doc')
  })
  .catch(err => {
    console.log(err)
    res.status(400).send('Failed to insert')
  })
  // Swisscontons.insertMany(req.body)
  // .exec((err, deductions) => {
  //   if (err) {
  //     next(err)
  //   }
  //   if (!deductions) {
  //     next(new Error('No post with that id'))
  //   } else {
  //     res.send(deductions)
  //   }
  // })
}

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Swisscontons.find(query, select, cursor)
    .then((swisscontons) => swisscontons.map((swisscontons) => swisscontons.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Swisscontons.findById(params.id)
    .then(notFound(res))
    .then((swisscontons) => swisscontons ? swisscontons.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Swisscontons.findById(params.id)
    .then(notFound(res))
    .then((swisscontons) => swisscontons ? Object.assign(swisscontons, body).save() : null)
    .then((swisscontons) => swisscontons ? swisscontons.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Swisscontons.findById(params.id)
    .then(notFound(res))
    .then((swisscontons) => swisscontons ? swisscontons.remove() : null)
    .then(success(res, 204))
    .catch(next)
