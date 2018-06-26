import json from './products.json';

export default {
  'GET /api/product/:id': (request, response, next) => {
    console.log(request);
    response.json(json.find(({ id }) => id === request.params.id) || request);
  }
};
