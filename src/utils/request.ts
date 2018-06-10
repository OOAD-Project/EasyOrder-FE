import axios from 'axios';

const request = axios
  .create({
    timeout: 5000,
    baseURL: '/api/',
    headers: {
      'Content-Type': 'application/json'
    }
  });

export default request;
