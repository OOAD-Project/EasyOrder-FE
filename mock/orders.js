import fs from "fs";
import path from "path";

const url = path.resolve(__dirname, "./orders.json");

export default {
  "GET /api/order/:id": (request, response, next) => {
    const orders = JSON.parse(fs.readFileSync(url, { encoding: "utf-8" }));
    const target = orders.find(({ id }) => id === request.params.id);
    response.send(target || 404);
  },
  "GET /api/order_by_table": (request, response, next) => {
    const orders = JSON.parse(fs.readFileSync(url, { encoding: "utf-8" }));
    const target = orders.find(({ table }) => table === request.params.table_id);
    response.send(target || 404);
  },
  "POST /api/order": (request, response, next) => {
    const orders = JSON.parse(fs.readFileSync(url, { encoding: "utf-8" }));
    const total =
      (request.body.list &&
        request.body.list.reduce(
          (acc, { price, count }) => acc + price * count,
          0
        )) ||
      0;
    const target = {
      ...request.query,
      id: (orders.length + 1).toString(),
      create_time: new Date().toString(),
      pay_time: "None",
      total,
      isPaid: false
    };
    orders.push(target);
    fs.writeFileSync(url, JSON.stringify(orders), "utf8");
    response.send(target);
  },
  "POST /api/payment": (request, response, next) => {
    response.send({
      status: Math.random() <= .7,
      payment_id: Math.floor(Math.random() * 1000000000).toString(16)
    });
  }
};
