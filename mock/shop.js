import shop from "./shop.json";

export default {
  "GET /api/shop": (request, response, next) => {
    response.json(shop);
  }
};
