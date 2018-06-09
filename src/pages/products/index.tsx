import logoUrl from '@/assets/images/niuza.jpg';
import SellerOutline from '@/components/SellerOutline';
import ShopCart from '@/components/ShopCart';
import TreeList, { ICategory } from '@/components/TreeList';
import { Tabs } from 'antd-mobile';
import { observer } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import { Sticky, StickyContainer } from 'react-sticky';
import styles from './index.less';

interface IProducts extends RouteConfigComponentProps<{}> {
}

const tabs = [
  { title: '点菜' },
  { title: '评价' },
  { title: '商家' }
];

const data: ICategory[] = [
  {
    id: 'niuza',
    category: '牛杂汤粉面',
    description: '各种精选牛杂粉面，正宗广式和味道',
    goods: [
      {
        id: '1',
        name: '原味牛杂面',
        price: 17,
        description: '粉面可自由选择，备注即可!',
        imageUrl: 'https://fuss10.elemecdn.com/3/a3/aed6124612ad38457e8e369d7e54bjpeg.jpeg?' +
        'imageMogr/format/webp/thumbnail/!140x140r/gravity/Center/crop/140x140/',
        salesPerMonth: 770,
        likes: 8
      },
      {
        id: '2',
        name: '素粉面',
        price: 15,
        description: '粉面可自由选择，备注即可!',
        imageUrl: 'https://i0.hdslb.com/bfs/sycp/tmaterial/201805/ccf46054f0d4307c84c387bf20109436.jpg',
        salesPerMonth: 430,
        likes: 83
      }
    ]
  }
];

function renderTabBar(props: any) {
  const content = ({ style }: any) => {
    return (
      <div style={ { ...style, zIndex: 1 } }>
        <Tabs.DefaultTabBar { ...props } />
      </div>
    );
  };
  return (
    <Sticky>
      { content }
    </Sticky>
  );
}

@observer
export default class Products extends React.Component<IProducts> {
  render() {
    const description = '本店有精选牛杂汤粉面，各种牛杂小吃和丸子，选择多多，惊喜多多！' +
      '注：本店牛杂分两种：招牌牛杂（牛肠、牛肺），精品牛杂（牛肚、牛腩、牛筋），特别提醒萝卜干口味是特辣。';
    return (
      <div>
        <SellerOutline logoUrl={ logoUrl } title={ '超级牛杂铺' } description={ description }/>
        <main className={ styles.container }>
          <StickyContainer data-type={ 'sticky-container' } className={ styles.sticky_container }>
            <Tabs
              tabs={ tabs }
              renderTabBar={ renderTabBar }
            >
              <div className={ styles.one_tab }>
                <TreeList dataSource={ data }/>
              </div>
              <div className={ styles.one_tab }>
                Content of second tab
              </div>
              <div className={ styles.one_tab }>
                Content of third tab
              </div>
            </Tabs>
          </StickyContainer>
        </main>
        <ShopCart/>
      </div>
    );
  }
}
