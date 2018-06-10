import { Cart } from '@/stores/cart';
import { Products } from '@/stores/products';

export default {
  $products: Products.create({ products: [] }),
  $cart: Cart.create({ list: [] })
};
