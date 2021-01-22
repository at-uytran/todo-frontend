import axios from 'axios';
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from './types';
import {API_URL} from '../config/constants';
import {returnErrors} from './errorActions';
const config = {
  headers: {'Content-Type': 'application/json'}
};

export const loadUser = () => (dispatch, getState) => {
  dispatch({type: USER_LOADING});
  return axios.post(`${API_URL}/api/auth/user`, {}, tokenConfig(getState))
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({type: AUTH_ERROR});
    });
}

export const register = ({userName, email, password}) => dispatch => {
  const body = JSON.stringify({userName, email, password});
  axios.post(`${API_URL}/api/register`, body, config)
    .then(res => {
      dispatch({type: REGISTER_SUCCESS, payload: res.data.data});
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
      dispatch({type: REGISTER_FAIL});
    });
}

export const login = ({email, password}) => dispatch => {
  const body = JSON.stringify({email, password});
  axios.post(`${API_URL}/api/auth/login`, body, config)
    .then(res => {
      dispatch({type: LOGIN_SUCCESS, payload: res.data.data});
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));
      dispatch({type: LOGIN_FAIL});
    });
}

export const logout = () => {
  return {type: LOGOUT_SUCCESS};
}

export const tokenConfig = (getState) => {
  const token = getState().auth.token;
  if (token) {
    config.headers['authorizationToken'] = `Bearer ${token}`;
  }
  return config;
}
