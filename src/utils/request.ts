import axios from 'axios';

const request = axios
  .create({
    timeout: 5000,
    baseURL: 'http://165.227.52.248/api/'
  });

export default request;
