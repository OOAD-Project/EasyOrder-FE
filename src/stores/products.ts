import request from '@/utils/request';
import { AxiosResponse } from 'axios';
import { flow, types } from 'mobx-state-tree';

export const Product = types.model('Product', {
  id: types.identifier(types.string),
  name: types.string,
  price: types.number,
  category: types.string,
  description: types.string,
  imageUrl: types.string,
  salesPerMonth: types.number,
  rate: types.number,
  likes: types.number,
  remain: types.number
});

export type ProductType = typeof Product.Type;

export const Products = types
  .model('Products', {
    products: types.array(Product)
  })
  .views((self) => ({
    get categories(): string[] {
      const dict = self.products.reduce(
        (acc: { [k: string]: boolean }, product: ProductType) => {
          acc[product.category] = true;
          return acc;
        },
        {}
      );
      return Object.keys(dict);
    }
  }))
  .actions((self) => ({
    LoadProductsAsync: flow(function* LoadCoursesAsync() {
      const { data }: AxiosResponse<ProductType[]> = yield request.get(
        '/products'
      );
      self.products.clear();
      self.products.push(...data);
    })
  }));

export type ProductsType = typeof Products.Type;
