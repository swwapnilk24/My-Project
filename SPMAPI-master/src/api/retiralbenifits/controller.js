import { success, notFound } from '../../services/response/'
import { Retiralbenifits } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Retiralbenifits.create(body)
    .then((retiralbenifits) => retiralbenifits.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Retiralbenifits.count(query)
    .then(count => Retiralbenifits.find(query, select, cursor)
      .then((retiralbenifits) => ({
        count,
        rows: retiralbenifits.map((retiralbenifits) => retiralbenifits.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Retiralbenifits.findById(params.id)
    .then(notFound(res))
    .then((retiralbenifits) => retiralbenifits ? retiralbenifits.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Retiralbenifits.findById(params.id)
    .then(notFound(res))
    .then((retiralbenifits) => {
      console.log(retiralbenifits)
      retiralbenifits ? Object.assign(retiralbenifits, body).save() : null
    }
    )
    .then((retiralbenifits) => retiralbenifits ? retiralbenifits.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Retiralbenifits.findById(params.id)
    .then(notFound(res))
    .then((retiralbenifits) => retiralbenifits ? retiralbenifits.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const getRBByCountry = (req, res, next) => {
  const country = req.params.country
  Retiralbenifits.find({country: country}, (err, benifits) => {
    if (err) {
      next(err)
    }
    res.send(benifits)
  })
}
export const getRBByCompany = (req, res, next) => {
  const country = req.params.country
  const company = req.params.company
  Retiralbenifits.find({country, company}, (err, benifits) => {
    if (err) {
      next(err)
    }
    res.send(benifits)
  })
}
