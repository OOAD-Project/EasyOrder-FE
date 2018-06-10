import { CartType } from '@/stores/cart';
import { Badge, Button, List, Modal } from 'antd-mobile';
import classnames from 'classnames';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { MouseEventHandler } from 'react';
import styles from './ShopCart.less';

interface IShopCartProps {
  $cart?: CartType;
}

@inject('$cart')
@observer
export default class ShopCart extends React.Component<IShopCartProps> {

  @observable
  listVisible = false;

  @computed
  get Badge() {
    const { $cart } = this.props;
    const text = $cart!.list.length ? '已选' : '请选';
    return (
      <Badge text={ $cart!.list.length }>
        <span className={ classnames(styles.shopcart, $cart!.list.length && styles.shopcart_selected) }>{ text }</span>
      </Badge>
    );
  }

  @computed
  get List() {
    const { $cart } = this.props;
    const items = $cart!.list.map(({ id, name, count, price }) => {
      return (
        <List.Item key={ id }>
          <div className={ styles.listContainer }>
            <span className={ styles.itemName }>{ name }</span>
            <span className={ styles.price }>{ price }</span>
            <span
              className={ styles.plus }
              onClick={ this.getHandleClickCountSetter(id, count - 1) }
            >-
            </span>
            <span className={ styles.count }>{ count }</span>
            <span
              className={ styles.plus }
              onClick={ this.getHandleClickCountSetter(id, count + 1) }
            >+
            </span>
          </div>
        </List.Item>
      );
    });
    return (
      <List>
        { items }
      </List>
    );
  }

  @action
  handleCloseList = () => {
    this.listVisible = false;
  }

  @action
  handleClickListButton: MouseEventHandler<HTMLDivElement> = (e) => {
    this.listVisible = true;
  }

  getHandleClickCountSetter: (id: number, count: number) =>
    MouseEventHandler<HTMLSpanElement> = (id: number, count: number) => (e) => {
    const { $cart } = this.props;
    $cart!.setCount(id, count);
  }

  render() {
    const { $cart } = this.props;
    return (
      <div className={ styles.container }>
        <div className={ styles.shopcart_wrapper } onClick={ this.handleClickListButton }>
          { this.Badge }
        </div>
        <div className={ styles.meta }>
          <span className={ styles.total_price }>{ $cart!.total }</span>
          <span className={ styles.description }>超级美食</span>
        </div>
        <div
          className={ classnames(styles.deal, $cart!.list.length && styles.deal_selected) }
          onClick={ this.handleClickListButton }
        >
          <span>去结算</span>
        </div>
        <Modal
          visible={ this.listVisible }
          transparent={ true }
          title={ '1号餐桌' }
          maskClosable={ true }
          onClose={ this.handleCloseList }
        >
          { this.List }
          <div style={ { marginTop: '.5rem' } }>
            <span>合计</span>
            <span className={ styles.total }>{ $cart!.total }</span>
          </div>
          <div style={ { marginTop: '.5rem' } }>
            <Button size={ 'small' } type={ 'primary' } disabled={ !$cart!.list.length }>OK，去支付</Button>
          </div>
        </Modal>
      </div>
    );
  }
}
