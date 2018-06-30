import { CartItem, CartItemType } from '@/stores/cart';
import { ProductType } from '@/stores/products';
import request from '@/utils/request';
import { AxiosResponse } from 'axios';
import { flow, getSnapshot, types } from 'mobx-state-tree';
import qs from 'qs';

export const SimpleListItem = types.model('SimpleListItem', {
  id: types.identifier(types.union(types.string, types.number)),
  name: types.string,
  count: types.number,
  price: types.number
});

export const Order = types.model('Order', {
  id: types.identifier(types.string),
  create_time: types.string,
  pay_time: types.string,
  table: types.union(types.string, types.number),
  list: types.array(SimpleListItem),
  total: types.number,
  isPaid: types.boolean
});

export type OrderType = typeof Order.Type;
export type OrderSnapShotType = typeof Order.SnapshotType;

export const OrderBody = types.model('OrderBody', {
  table: types.string,
  list: types.array(SimpleListItem)
});

export type OrderBodySnapshotType = typeof OrderBody.SnapshotType;

export const Orders = types
  .model('Orders', {
    current: types.maybe(Order),
    list: types.array(Order),
    feedback: types.maybe(types.model({
      status: types.boolean,
      payment_id: types.string
    }))
  })
  .views((self) => ({
    currentFoodList(products: ProductType[]): CartItemType[] {
      if (self.current) {
        const data: Array<CartItemType | false> = self.current.list.map(
          (item) => {
            const target = products.find((product) => product.id === item.id);
            if (target) {
              return CartItem.create({
                ...getSnapshot(target),
                count: item.count
              });
            }
            return false;
          }
        );
        return data.filter(
          (target) => typeof target !== 'boolean'
        ) as CartItemType[];
      }
      return [];
    },
    get currentTotal() {
      if (self.current) {
        return self.current.list.reduce(
          (total: number, { price, count }) => total + price * count,
          0
        );
      }
    }
  }))
  .actions((self) => ({
    LoadCurrentOrderAsync: flow(function* LoadCurrentOrderAsync(
      id: number | string
    ) {
      const { data }: AxiosResponse<OrderSnapShotType> = yield request.get(
        `/order/${id}`
      );
      self.current = Order.create(data);
    }),
    CreateOrderAsync: flow(function* CreateOrderAsync(
      body: OrderBodySnapshotType
    ) {
      const {
        data
      }: AxiosResponse<{}> = yield request.post(
        '/order',
        getSnapshot(OrderBody.create(body)),
        {
          headers: { 'content-type': 'application/x-www-form-urlencoded' },
          params: getSnapshot(OrderBody.create(body))
        }
      );
      return data;
    }),
    FetchTableLatestOrder: flow(function* FetchTableLatestOrder(table: string) {
      const { data } = yield request.get<OrderSnapShotType>('/order_by_table/' + table);
      return data as OrderSnapShotType;
    }),
    PayAsync: flow(function* PayAsync(method: string, total: number) {
      if (self.current) {
        const { data } = yield request.post<{ status: boolean, payment_id: string }>(`/payment`, {
          payment_time: formatDate(),
          payment_way: method,
          payment_amount: total,
          reservation_id: self.current.id
        },
          {
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            params: {
              payment_time: formatDate(),
              payment_way: method,
              payment_amount: total,
              reservation_id: self.current.id
            }
          });
        const { status, payment_id } = data;
        if (payment_id) {
          self.feedback = {
            status, payment_id
          };
        }
      }
    })
  }));

function formatDate(date = new Date()) {
  // tslint:disable-next-line:one-variable-per-declaration
  const year = date.getFullYear(),
    month = date.getMonth() + 1, // 月份是从0开始的
    day = date.getDate(),
    hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds();
  const newTime = year + '-' +
    (month < 10 ? '0' + month : month) + '-' +
    (day < 10 ? '0' + day : day) + ' ' +
    (hour < 10 ? '0' + hour : hour) + ':' +
    (min < 10 ? '0' + min : min) + ':' +
    (sec < 10 ? '0' + sec : sec);

  return newTime;
}

export type OrdersType = typeof Orders.Type;
