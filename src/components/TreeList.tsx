import { CartType } from '@/stores/cart';
import { ProductType } from '@/stores/products';
import { List, SearchBar } from 'antd-mobile';
import { action, computed, observable } from 'mobx';
import { inject, observer } from 'mobx-react';
import React, { MouseEventHandler } from 'react';
import styles from './TreeList.less';

const Item = List.Item;

interface ITreeListProps {
  dataSource: ProductType[];
  categories: string[];
  $cart?: CartType;
}

@inject('$cart')
@observer
export default class TreeList extends React.Component<ITreeListProps> {

  @observable
  filter: 'all' | string = 'all';

  @observable
  searchText = '';

  @computed
  get data() {
    const { dataSource } = this.props;
    const afterTag = this.filter === 'all'
      ? dataSource
      : dataSource.filter(({ category }) => category === this.filter);
    return this.searchText.length
      ? afterTag.filter(({ name }) => name.includes(this.searchText))
      : afterTag;
  }

  @computed
  get Categories() {
    const { categories } = this.props;
    const base = categories.map((category) => (
      <Item key={ category }>
        <div
          data-category={ category }
          className={ styles.tagId }
          onClick={ this.handleClickFilter }
        >{ category }
        </div>
      </Item>
    ));
    const list = [
      (
        <Item key={ 'all' }>
          <div
            data-category={ 'all' }
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
              <img src={ good.imageUrl } alt={ good.name }/>
            </div>
            <div className={ styles.content }>
              <div className={ styles.title }>{ good.name }</div>
              <div className={ styles.brief }>{ good.description }</div>
              <div className={ styles.brief }>
                月售{ good.salesPerMonth } 剩余{ good.remain } 赞{ good.likes }
              </div>
              <div className={ styles.price_container }>
                <div className={ styles.price }>{ good.price }</div>
                <div className={ styles.plus } onClick={ this.handleClickAdd(good) }>+</div>
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
    if (e.currentTarget.dataset.category) {
      this.filter = e.currentTarget.dataset.category === 'all' ? 'all' : e.currentTarget.dataset.category;
    }
  }

  @action
  handleChangeSearchText = (value: string) => {
    this.searchText = value;
  }

  handleClickAdd: (good: ProductType) => MouseEventHandler<HTMLDivElement> = (good) => (e) => {
    const { $cart } = this.props;
    $cart!.add(good, 1);
  }

  render() {
    return (
      <div className={ styles.container }>
        <SearchBar
          placeholder={ '寻找美食' }
          value={ this.searchText }
          onChange={ this.handleChangeSearchText }
        />
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
