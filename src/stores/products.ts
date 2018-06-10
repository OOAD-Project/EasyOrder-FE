import request from '@/utils/request';
import { AxiosResponse } from 'axios';
import { flow, types } from 'mobx-state-tree';

export const Product = types
  .model('Product', {
    id: types.identifier(types.number),
    name: types.string,
    picture: types.string,
    price: types.number,
    description: types.string,
    rating: types.number,
    amount: types.number,
    likes: types.number,
    tag_id: types.number,
    sales_permonth: types.number
  });

export type ProductType = typeof Product.Type;

export const Products = types
  .model('Products', {
    products: types.array(Product)
  })
  .views((self) => ({
    get tagIds(): number[] {
      const dict = self.products.reduce((acc: { [ k: number ]: boolean }, product: ProductType) => {
        acc[ product.tag_id ] = true;
        return acc;
      }, {});
      return Object.keys(dict).map((key) => Number(key));
    }
  }))
  .actions((self) => ({
    LoadProductsAsync: flow(function* LoadCoursesAsync() {
      const { data }: AxiosResponse<{ result: ProductType[] }> = yield request.get('/products');
      console.log(data);
      self.products.clear();
      self.products.push(...data.result);
    })
  }));

export type ProductsType = typeof Products.Type;
