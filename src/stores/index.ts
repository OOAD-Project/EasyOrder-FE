import { Cart } from '@/stores/cart';
import { Global } from '@/stores/global';
import { Orders } from '@/stores/orders';
import { Products } from '@/stores/products';

export default {
  $products: Products.create({ products: [] }),
  $cart: Cart.create({ list: [] }),
  $orders: Orders.create({ current: null, list: [] }),
  $global: Global.create()
};
