import DetailItems from '@/components/DetailItems';
import { Order, OrdersType, OrderType } from '@/stores/orders';
import { ProductsType } from '@/stores/products';
import { Button, Icon, List, NavBar } from 'antd-mobile';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import Link from 'umi/link';

interface IOrderWithIdProps extends RouteConfigComponentProps<{ id: string }> {
  $orders?: OrdersType;
  $products?: ProductsType;
}

@inject('$orders', '$products')
@observer
export default class OrderWithId extends React.Component<IOrderWithIdProps> {

  async componentDidMount() {
    const { $orders, $products, match } = this.props;
    if ($products!.products.length === 0) {
      await $products!.LoadProductsAsync();
    }
    await $orders!.LoadCurrentOrderAsync(match.params.id);
  }

  @computed
  get TopBar() {
    const icon = (
      <Link to={ '/products' }>
        <Icon type={ 'left' }/>
      </Link>
    );
    return (
      <NavBar mode={ 'light' } icon={ icon }>查看订单</NavBar>
    );
  }

  @computed
  get BasicInformation() {
    const header = () => '基本信息';
    const { $orders, match } = this.props;
    return $orders!.current && (
      <List renderHeader={ header }>
        <List.Item extra={ `${match.params.id}号` }>订单编号</List.Item>
        <List.Item extra={ `${$orders!.current!.table_num}号桌` }>餐桌号</List.Item>
      </List>
    );
  }

  @computed
  get Detail() {
    const header = () => '订单详情';
    const { $orders, $products } = this.props;
    return $orders!.current && (
      <List renderHeader={ header }>
        <DetailItems dataSource={ $orders!.currentFoodList($products!.products) }/>
        <List.Item extra={ `￥${$orders!.currentTotal}` }>合计</List.Item>
      </List>
    );
  }

  @computed
  get Other() {
    const header = () => '其他信息';
    const { $orders } = this.props;
    if ($orders!.current) {
      const stateText = $orders!.current!.isPaid ? '已支付' : '未支付';
      const button = $orders!.current!.isPaid ? null : (
        <Button size={ 'small' }>现在支付</Button>
      );
      return (
        <List renderHeader={ header }>
          <List.Item>
            支付方式
            <List.Item.Brief>
              在线支付
            </List.Item.Brief>
          </List.Item>
          <List.Item extra={ button }>
            支付状态
            <List.Item.Brief>
              { stateText }
            </List.Item.Brief>
          </List.Item>
        </List>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        { this.TopBar }
        { this.BasicInformation }
        { this.Detail }
        { this.Other }
      </div>
    );
  }
}
