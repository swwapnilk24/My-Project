import axios from 'axios';
import { server } from './config';
import { PublicHolidaysType } from '../actions/ActionType';

export function getPublicHolidaysData(dispatch) {
  axios({
    method: 'get',
    url: `${server}/publicholidays`
  }).then(response => {
    console.log(response.data);
    dispatch({ type: PublicHolidaysType.GET_PUBLIC_HOLIDAYS_DATA, data: response.data });
  });
}
export function upPublicHolidaysData(info, shouldUpdate, dispatch) {
  console.log(info);
  axios({
    method: 'post',
    url: `${server}/publicholidays`,
    data: info
  }).then(response => {
    console.log('hello', response.data);
    dispatch({ type: PublicHolidaysType.UPDATE_PUBLIC_HOLIDAYS_DATA, data: response.data });
  }).catch(error => {
    console.log(error);
  });
}
