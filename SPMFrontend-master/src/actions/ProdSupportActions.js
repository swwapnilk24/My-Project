import axios from 'axios';
import { ProdSupport, ErrorType } from './ActionType';
import { ProdSupportURL } from './ActionURL';
import { Configs } from './ActionConfigs';

export function saveProdSupport(addData) {
  console.log('Add Data', addData);
  return function (dispatch) {
    axios
    .post(ProdSupportURL.PROD_SUPPORT_URL, JSON.stringify(addData), Configs.ORG_CHART_CONFIG)
    .then(response => {
      console.log('response.data', response.data);
      dispatch({ type: ProdSupport.ADD_PROD_SUPPORT, data: response.data });
    })
    .catch(err => {
      dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
    });
  };
}

export function getProdSupportData() {
  console.log('welcome to get employees', ProdSupportURL.PROD_SUPPORT_URL);
  return function (dispatch) {
    axios
     .get(ProdSupportURL.PROD_SUPPORT_URL, Configs.ORG_CHART_CONFIG)
     .then(res => {
       console.log('Data', res.data);
       dispatch({ type: ProdSupport.GET_PROD_SUPPORT, data: res.data });
     })
     .catch(err => {
       dispatch({ type: ErrorType.ERROR_LOG, message: err.message });
     });
  };
}
