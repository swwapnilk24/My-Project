// import axios from 'axios';
// import { HRQueries, ErrorType } from './ActionType';
// import { HRQueriesURL } from './ActionURL';
// import { Configs } from './ActionConfigs';
import { HRQueries } from './ActionType';

export function updateHRQueries(data) {
  return {
    type: HRQueries.ADD_HR_QUERIES,
    data
  };
}

export function setHRQueriesData(data) {
  return {
    type: HRQueries.GET_HR_QUERIES,
    data
  };
}
//   export function getHRQueriesData() {
//     console.log('welcome to get HR Quries', HRQueriesURL.HR_QUERIES_URL);
//     return function (dispatch) {
//       axios
//        .get(HRQueriesURL.HR_QUERIES_URL, Configs.ORG_CHART_CONFIG)
//        .then(res => {
//          console.log('Data', res.data);
//          dispatch({ type: HRQueries.GET_HR_QUERIES, data: res.data });
//        })
//        .catch(err => {
//          dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
//        });
//     };
// }
