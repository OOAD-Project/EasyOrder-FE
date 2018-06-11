import { CartType } from '@/stores/cart';
import { GlobalType } from '@/stores/global';
import { OrdersType } from '@/stores/orders';
import { Icon, List, NavBar } from 'antd-mobile';
import classnames from 'classnames';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { MouseEventHandler } from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import DetailItems from '../../components/DetailItems';
import styles from './index.less';

interface IOrderProps {
  $cart?: CartType;
  $global?: GlobalType;
  $orders?: OrdersType;
}

@inject('$cart', '$global', '$orders')
@observer
export default class Order extends React.Component<IOrderProps> {

  @computed
  get TopBar() {
    const icon = (
      <Link to={ '/products' }>
        <Icon type={ 'left' }/>
      </Link>
    );
    return (
      <NavBar mode={ 'light' } icon={ icon }>提交订单</NavBar>
    );
  }

  @computed
  get BasicInformation() {
    const header = () => '基本信息';
    const { $global } = this.props;
    return (
      <List renderHeader={ header }>
        <List.Item extra={ `${$global!.table}号` }>餐桌号</List.Item>
      </List>
    );
  }

  @computed
  get Detail() {
    const header = () => '订单详情';
    const { $cart } = this.props;
    return (
      <List renderHeader={ header }>
        <DetailItems dataSource={ $cart!.list }/>
      </List>
    );
  }

  @computed
  get Other() {
    const header = () => '其他信息';
    return (
      <List renderHeader={ header }>
        <List.Item extra={ '在线支付' }>
          支付方式
        </List.Item>
      </List>
    );
  }

  handleClickSubmitOrder: MouseEventHandler<HTMLElement> = async (e) => {
    const { $cart, $global, $orders } = this.props;
    if ($cart!.list.length && $global!.table) {
      const data: { reservation_id: number } = await $orders!.CreateOrderAsync($cart!.orderBody($global!.table!));
      if (data && data.reservation_id) {
        router.push(`/order/${data.reservation_id}`);
      }
    }
  }

  render() {
    const { $cart } = this.props;
    return (
      <div>
        { this.TopBar }
        { this.BasicInformation }
        { this.Detail }
        { this.Other }
        <div className={ styles.container }>
          <div className={ styles.meta }>
            <span>合计</span>
            <span className={ styles.total_price }>{ $cart!.total }</span>
          </div>
          <div
            className={ classnames(styles.deal, $cart!.list.length && styles.deal_selected) }
            onClick={ this.handleClickSubmitOrder }
          >
            <span>提交订单</span>
          </div>
        </div>
      </div>
    );
  }
}
