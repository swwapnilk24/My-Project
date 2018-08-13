import axios from 'axios';
import { LoginType, ErrorType } from './ActionType';
import { LoginUrl } from './ActionURL';
import { Configs } from './ActionConfigs';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import AppConfig from '../config';

export function userLogin(userData, callback) {
  return function (dispatch) {
    const accessToken = { access_token: AppConfig.MASTER_TOKEN };
    const LOGINCONFIG = Configs.LOGINCONFIG;
    LOGINCONFIG.auth = {
      username: userData.email,
      password: userData.password
    };
    axios
      .post(LoginUrl.AUTHENTICATE, accessToken, LOGINCONFIG)
      .then(response => {
        const token = response.data.token;
        if (token) {
          localStorage.setItem('jwtToken', token);
          setAuthorizationToken(response.data.token);
          // localStorage.setItem('user', JSON.stringify(response.data.user.roles));
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        callback(response.data);
        dispatch({
          type: LoginType.AUTHENTICATE,
          userInfo: response.data
        });
      })
      .catch(err => {
        dispatch({ type: ErrorType.ERROR_LOG, mesage: err.message });
      });
  };
}

// export function logout() {
//   return dispatch => {
//     localStorage.removeItem('jwtToken');
//     localStorage.removeItem('jwtToken');
//     setAuthorizationToken(false);
//   };
// }
