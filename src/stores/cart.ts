import { ProductType } from '@/stores/products';
import { types } from 'mobx-state-tree';

const CartItem = types
  .model('CartItem', {
    id: types.number,
    name: types.string,
    count: types.number,
    price: types.number
  });

type CartItemType = typeof CartItem.Type;

export const Cart = types
  .model('Cart', {
    list: types.array(CartItem)
  })
  .views((self) => ({
    get total(): number {
      return self.list.reduce((total: number, { price, count }: CartItemType) => total + price * count, 0);
    }
  }))
  .actions((self) => ({
    add(product: ProductType, count: number) {
      const target = self.list.find(({ id }) => product.id === id);
      if (target) {
        target.count += count;
      } else {
        self.list.push(CartItem.create({
          id: product.id,
          name: product.name,
          count,
          price: product.price
        }));
      }
    },
    setCount(targetId: number, count: number) {
      if (count > 0) {
        const target = self.list.find(({ id }) => targetId === id);
        if (target) {
          target.count = count;
        }
      } else {
        const index = self.list.findIndex(({ id }) => targetId === id);
        if (index > -1) {
          self.list.splice(index, 1);
        }
      }
    }
  }));

export type CartType = typeof Cart.Type;
