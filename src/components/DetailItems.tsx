import { CartItemType } from '@/stores/cart';
import { List } from 'antd-mobile';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './DetailItems.less';

interface IDetailItemsProps {
  dataSource: CartItemType[];
}

@observer
export default class DetailItems extends React.Component<IDetailItemsProps> {
  render() {
    const { dataSource } = this.props;
    return dataSource.map((cartItem) => {
      return (
        <List.Item
          key={ cartItem.id }
          thumb={ cartItem.imageUrl }
          extra={ '￥' + cartItem.count * cartItem.price }
        >
          <span className={ styles.name }>{ cartItem.name }</span>
          <span className={ styles.count }>{ `×${cartItem.count}` }</span>
        </List.Item>
      );
    });
  }
}
