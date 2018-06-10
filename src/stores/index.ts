import { Products } from '@/stores/products';

export default {
  $products: Products.create({ products: [] })
};
