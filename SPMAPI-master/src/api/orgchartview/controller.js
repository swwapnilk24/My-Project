import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { OrgchartView } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
OrgchartView.find(query, select, cursor)
  .then((orgchartViews) => orgchartViews.map((orgchartView) => orgchartView.view()))
  .then(success(res))
  .catch(next)

export const show = ({ params }, res, next) =>
OrgchartView.findById(params.id)
  .then(notFound(res))
  .then((orgchartView) => orgchartView ? orgchartView.view() : null)
  .then(success(res))
  .catch(next)