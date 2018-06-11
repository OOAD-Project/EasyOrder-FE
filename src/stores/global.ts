import { types } from 'mobx-state-tree';

export const Global = types
  .model('Global', {
    table: types.maybe(types.number)
  })
  .actions((self) => ({
    setTable(table: number) {
      self.table = table;
    }
  }));

export type GlobalType = typeof Global.Type;
