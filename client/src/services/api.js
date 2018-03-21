import axios from 'axios';

import { api } from './config';

const { url } = api;

export const postPublic = (path, data, config) => {
  return axios.post(`${url}${path}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  });
}

export const getPublic = (path, data, config) => {
  return axios.get(`${url}${path}`, data, {
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    ...config
  });
}
