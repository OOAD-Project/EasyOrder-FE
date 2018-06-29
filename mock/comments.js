import json from './comments.json';

export default {
  'GET /api/comments': (request, response, next) => {
    response.json(json);
  }
};
