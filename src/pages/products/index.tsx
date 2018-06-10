import logoUrl from '@/assets/images/niuza.jpg';
import SellerOutline from '@/components/SellerOutline';
import ShopCart from '@/components/ShopCart';
import TreeList from '@/components/TreeList';
import { ProductsType } from '@/stores/products';
import { Tabs } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import styles from './index.less';

interface IProducts extends RouteConfigComponentProps<{}> {
  $products?: ProductsType;
}

const tabs = [
  { title: '点菜' },
  { title: '评价' },
  { title: '商家' }
];

@inject('$products')
@observer
export default class Products extends React.Component<IProducts> {

  async componentDidMount() {
    this.props.$products!.LoadProductsAsync();
  }

  render() {
    const description = '本店有精选牛杂汤粉面，各种牛杂小吃和丸子，选择多多，惊喜多多！' +
      '注：本店牛杂分两种：招牌牛杂（牛肠、牛肺），精品牛杂（牛肚、牛腩、牛筋），特别提醒萝卜干口味是特辣。';
    const { $products } = this.props;
    return (
      <div>
        <SellerOutline logoUrl={ logoUrl } title={ '超级牛杂铺' } description={ description }/>
        <main className={ styles.container }>
          <Tabs
            tabs={ tabs }
          >
            <div className={ styles.one_tab }>
              <TreeList dataSource={ $products!.products } tagIds={ $products!.tagIds }/>
            </div>
            <div className={ styles.one_tab }>
              Content of second tab
            </div>
            <div className={ styles.one_tab }>
              Content of third tab
            </div>
          </Tabs>
        </main>
        <ShopCart/>
      </div>
    );
  }
}
