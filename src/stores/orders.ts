import { CartItem, CartItemType } from '@/stores/cart';
import { ProductType } from '@/stores/products';
import request from '@/utils/request';
import { AxiosResponse } from 'axios';
import { flow, getSnapshot, types } from 'mobx-state-tree';

export const SimpleListItem = types.model('SimpleListItem', {
  id: types.identifier(types.string),
  name: types.string,
  count: types.number,
  price: types.number
});

export const Order = types.model('Order', {
  id: types.identifier(types.string),
  create_time: types.string,
  pay_time: types.string,
  table: types.string,
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
    list: types.array(Order)
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
      }: AxiosResponse<{ reservation_id: number }> = yield request.post(
        '/order',
        getSnapshot(OrderBody.create(body))
      );
      return data;
    })
  }));

export type OrdersType = typeof Orders.Type;
