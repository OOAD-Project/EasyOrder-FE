import logoUrl from '@/assets/images/niuza.jpg';
import SellerOutline from '@/components/SellerOutline';
import ShopCart from '@/components/ShopCart';
import TreeList from '@/components/TreeList';
import { GlobalType } from '@/stores/global';
import { ProductsType } from '@/stores/products';
import { Tabs } from 'antd-mobile';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import styles from './index.less';

interface IProducts extends RouteConfigComponentProps<{}> {
  $products?: ProductsType;
  $global?: GlobalType;
}

const tabs = [{ title: '点菜' }, { title: '评价' }, { title: '商家' }];

@inject('$products', '$global')
@observer
export default class Products extends React.Component<IProducts> {
  async componentDidMount() {
    this.props.$products!.LoadProductsAsync();
  }

  render() {
    const { shop } = this.props.$global!;
    const { $products } = this.props;
    return (
      <div>
        <SellerOutline
          logoUrl={(shop && shop!.logoUrl) || ''}
          title={(shop && shop!.name) || ''}
          description={(shop && shop!.description) || ''}
        />
        <main className={styles.container}>
          <Tabs tabs={tabs}>
            <div className={styles.one_tab}>
              <TreeList
                dataSource={$products!.products}
                categories={$products!.categories}
              />
            </div>
            <div className={styles.one_tab}>Content of second tab</div>
            <div className={styles.one_tab}>Content of third tab</div>
          </Tabs>
        </main>
        <ShopCart />
      </div>
    );
  }
}
