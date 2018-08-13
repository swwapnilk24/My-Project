import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { CompensationPlanStatus } from '.'

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
CompensationPlanStatus.find(query, select, cursor)
  .then((compensationPlanStats) => compensationPlanStats.map((compensationPlanStatus) => compensationPlanStatus.view()))
  .then(success(res))
  .catch(next)