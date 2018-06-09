import { Badge } from 'antd-mobile';
import classnames from 'classnames';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './ShopCart.less';

interface IShopCartProps {

}

@observer
export default class ShopCart extends React.Component<IShopCartProps> {
  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.shopcart_wrapper }>
          <Badge text={ 23 }>
            <span className={ classnames(styles.shopcart, styles.shopcart_selected) }>已选</span>
          </Badge>
        </div>
        <div className={ styles.meta }>
          <span className={ styles.total_price }>{ 14.5 }</span>
          <span className={ styles.description }>免配送费</span>
        </div>
        <div className={ classnames(styles.deal, styles.deal_selected) }>
          <span>去结算</span>
        </div>
      </div>
    );
  }
}
