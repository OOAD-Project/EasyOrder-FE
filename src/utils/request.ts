import axios from 'axios';
import https from 'https';

const request = axios
  .create({
    timeout: 5000,
    baseURL: process.env.NODE_ENV === 'production'
      ? 'https://149.28.53.135/api/'
      : 'https://149.28.53.135/api/',
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });

export default request;
