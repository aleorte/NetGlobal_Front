import axios from 'axios';
import { URL } from '../constants';

const API = axios.create({
  baseURL: `${URL}`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

API.interceptors.request.use(
  config => {
    const token = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      delete API.defaults.headers.common.Authorization;
    }
    return config;
  },

  error => Promise.reject(error)
);

export default API;