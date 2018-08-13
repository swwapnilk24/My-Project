import { success, notFound } from '../../services/response/'
import { Taxbenifit } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Taxbenifit.create(body)
    .then((taxbenifit) => taxbenifit.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Taxbenifit.count(query)
    .then(count => Taxbenifit.find(query, select, cursor)
      .then((taxbenifits) => ({
        count,
        rows: taxbenifits.map((taxbenifit) => taxbenifit.view())
      }))
    )
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Taxbenifit.findById(params.id)
    .then(notFound(res))
    .then((taxbenifit) => taxbenifit ? taxbenifit.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Taxbenifit.findById(params.id)
    .then(notFound(res))
    .then((taxbenifit) => taxbenifit ? Object.assign(taxbenifit, body).save() : null)
    .then((taxbenifit) => taxbenifit ? taxbenifit.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Taxbenifit.findById(params.id)
    .then(notFound(res))
    .then((taxbenifit) => taxbenifit ? taxbenifit.remove() : null)
    .then(success(res, 204))
    .catch(next)

export const getTBByCountry = (req, res, next) => {
  const country = req.params.country
  Taxbenifit.find({country: country}, (err, benifits) => {
    if (err) {
      next(err)
    }
    res.send(benifits)
  })
}

export const getTBByCompany = (req, res, next) => {
  const country = req.params.country
  const company = req.params.company
  Taxbenifit.find({country, company}, (err, benifits) => {
    if (err) {
      next(err)
    }
    res.send(benifits)
  })
}

