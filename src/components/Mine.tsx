import { GlobalType } from '@/stores/global';
import { OrdersType } from '@/stores/orders';
import { Button, List } from 'antd-mobile';
import { observable, runInAction } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import router from 'umi/router';

const Item = List.Item;
const Brief = Item.Brief;

interface IMineProps {
  $orders?: OrdersType;
  $global?: GlobalType;
}

@inject('$global', '$orders')
@observer
export default class Mine extends React.Component<IMineProps> {

  @observable
  orderId: string | null = null;

  async componentDidMount() {
    const { $orders, $global } = this.props;
    const { id } = await $orders!.FetchTableLatestOrder($global!.table || '');
    if (id) {
      runInAction(() => {
        this.orderId = id;
      });
    }
  }

  handleClickLatestOrder = async () => {
    if (this.orderId) {
      router.push(`/order/${this.orderId}`);
    }
  }

  render() {
    const { $global } = this.props;
    return (
      <div style={{ marginTop: '1rem' }}>
        <List>
          <Item extra={`${$global!.table}号`}>当前桌号</Item>
          <Item>
            <Button
              type={'primary'}
              disabled={!this.orderId}
              onClick={this.handleClickLatestOrder}
            >
              查看最新订单
            </Button>
          </Item>
        </List>
      </div>
    );
  }
}
