import { ProductType } from '@/stores/products';
import { List } from 'antd-mobile';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './TreeList.less';

const Item = List.Item;

interface ITreeListProps {
  dataSource: ProductType[];
  tagIds: number[];
}

@observer
export default class TreeList extends React.Component<ITreeListProps> {

  @computed
  get Categories() {
    const list = this.props.tagIds.map((tagId) => (
      <Item key={ tagId }>
        { tagId }
      </Item>
    ));
    return (<List>{ list }</List>);
  }

  @computed
  get Products() {
    const list = this.props.dataSource.map((good) => {
      return (
        <Item key={ good.id } align={ 'top' } multipleLine={ true }>
          <div className={ styles.meta }>
            <div className={ styles.product_img }>
              <img src={ good.picture } alt={ good.name }/>
            </div>
            <div className={ styles.content }>
              <div className={ styles.title }>{ good.name }</div>
              <div className={ styles.brief }>{ good.description }</div>
              <div className={ styles.brief }>月售{ good.sales_permonth } 赞{ good.likes }</div>
              <div className={ styles.price_container }>
                <div className={ styles.price }>{ good.price }</div>
                <div className={ styles.plus }>+</div>
              </div>
            </div>
          </div>
        </Item>
      );
    });
    return (<List>{ list }</List>);
  }

  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.list }>
          <div className={ styles.left }>
            { this.Categories }
          </div>
          <div className={ styles.right }>
            { this.Products }
          </div>
        </div>
      </div>
    );
  }
}
