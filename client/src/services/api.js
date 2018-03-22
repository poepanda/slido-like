import axios from 'axios';

import { api } from './config';
/**
 * Why import the store?
 * To get the state in order to extract the user token which will be used in private request
 */
import { store } from 'app/App';
import { userToken } from 'app/data/me/selectors';

const { url } = api;

export const getPublic = (path, params, config) => {
  return axios.get(`${url}${path}`, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  });
}

export const postPublic = (path, data, config) => {
  return axios.post(`${url}${path}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  });
}

export const getPrivate = (path, params, config) => {
  console.log('get private', userToken(store.getState()));
  return axios.get(`${url}${path}`, {
    params,
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': userToken(store.getState()),
    },
    ...config
  });
}

export const postPrivate = (path, data, config) => {
  return axios.post(`${url}${path}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': userToken(store.getState()),
    },
    ...config
  });
}