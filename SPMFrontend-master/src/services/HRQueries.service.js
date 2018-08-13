import axios from 'axios';
import AppConfig from '../config';
import { updateHRQueries } from '../actions/HRQueriesActions';

export const updateHRQueriesData = (hrdata, dispatch) => {
  axios.post(`${AppConfig.BASE_URL}/HRQueries`, hrdata)
  .then(res => {
    console.log('Adding hrquery: ', res.data);
    dispatch(updateHRQueries(res.data));
  })
  .catch(error => {
    console.log(error);
  });
}
