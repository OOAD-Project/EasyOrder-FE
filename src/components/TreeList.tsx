import { ProductType } from '@/stores/products';
import { List } from 'antd-mobile';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import React, { MouseEventHandler } from 'react';
import styles from './TreeList.less';

const Item = List.Item;

interface ITreeListProps {
  dataSource: ProductType[];
  tagIds: number[];
}

@observer
export default class TreeList extends React.Component<ITreeListProps> {

  @observable
  filter: 'all' | number = 'all';

  @computed
  get data() {
    const { dataSource } = this.props;
    return this.filter === 'all'
      ? dataSource
      : dataSource.filter(({ tag_id }) => tag_id === this.filter);
  }

  @computed
  get Categories() {
    const { tagIds } = this.props;
    const base = tagIds.map((tagId) => (
      <Item key={ tagId }>
        <div
          data-tag={ tagId }
          className={ styles.tagId }
          onClick={ this.handleClickFilter }
        >{ tagId }
        </div>
      </Item>
    ));
    const list = [
      (
        <Item key={ 'all' }>
          <div
            data-tag={ 'all' }
            className={ styles.tagId }
            onClick={ this.handleClickFilter }
          >{ '全部' }
          </div>
        </Item>
      ),
      ...base
    ];
    return (<List>{ list }</List>);
  }

  @computed
  get Products() {
    const list = this.data.map((good) => {
      return (
        <Item key={ good.id } align={ 'top' } multipleLine={ true }>
          <div className={ styles.meta }>
            <div className={ styles.product_img }>
              <img src={ good.picture } alt={ good.name }/>
            </div>
            <div className={ styles.content }>
              <div className={ styles.title }>{ good.name }</div>
              <div className={ styles.brief }>{ good.description }</div>
              <div className={ styles.brief }>
                月售{ good.sales_permonth } 剩余{ good.amount } 赞{ good.likes }
              </div>
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

  @action
  handleClickFilter: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.currentTarget.dataset.tag) {
      this.filter = e.currentTarget.dataset.tag === 'all' ? 'all' : Number.parseInt(e.currentTarget.dataset.tag);
    }
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
