import json from './products.json';

export default {
  'GET /api/products': (request, response, next) => {
    response.json(json);
  }
};
