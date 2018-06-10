import axios from 'axios';

const request = axios.create({
  timeout: 5000,
  baseURL: process.env.NODE_ENV === 'production'
    ? 'https://149.28.53.135/api/'
    : 'https://149.28.53.135/api/'
});

export default request;
