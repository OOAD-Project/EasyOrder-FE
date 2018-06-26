import request from '@/utils/request';
import { AxiosResponse } from 'axios';
import { flow, types } from 'mobx-state-tree';

export const Shop = types.model('Shop', {
  name: types.string,
  logoUrl: types.string,
  description: types.string,
  fields: types.array(
    types.model('Field', {
      key: types.identifier(types.string),
      value: types.string
    })
  )
});

export type ShopType = typeof Shop.Type;
export type ShopSnapshotType = typeof Shop.SnapshotType;

export const Global = types
  .model('Global', {
    table: types.maybe(types.string),
    shop: types.maybe(Shop)
  })
  .actions((self) => ({
    setTable(table: string) {
      self.table = table;
    },
    LoadShopAsync: flow(function* LoadShopAsync() {
      const { data }: AxiosResponse<ShopSnapshotType> = yield request.get(
        '/shop'
      );
      self.shop = Shop.create(data);
    })
  }));

export type GlobalType = typeof Global.Type;
