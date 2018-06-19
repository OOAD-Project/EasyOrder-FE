import { OrdersType } from '@/stores/orders';
import { ProductsType } from '@/stores/products';
import { Icon, List, NavBar, Result } from 'antd-mobile';
import { computed } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import Link from 'umi/link';

interface IPayResultProps extends RouteConfigComponentProps<{ id: string }> {
  $orders?: OrdersType;
  $products?: ProductsType;
}

@inject('$orders', '$products')
@observer
export default class PayResult extends React.Component<IPayResultProps> {

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
      <Link to={ `/order/${this.props.match.params.id}` }>
        <Icon type={ 'left' }/>
      </Link>
    );
    return (
      <NavBar mode={ 'light' } icon={ icon }>支付订单</NavBar>
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
  get Message() {
    const { $orders } = this.props;
    return (
      <div>
        { $orders!.currentTotal }元
      </div>
    );
  }

  render() {
    const myImg = (src: string) => <img src={ src } className='spe am-icon am-icon-lg' alt=''/>;
    return (
      <div>
        { this.TopBar }
        <Result
          img={ myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg') }
          title='支付成功'
          message={ this.Message }
        />
        { this.BasicInformation }
      </div>
    );
  }
}
