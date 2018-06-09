import { List, SearchBar } from 'antd-mobile';
import { action, computed, observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Sticky, StickyContainer } from 'react-sticky';
import styles from './TreeList.less';

const Item = List.Item;

export interface IGood {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  salesPerMonth: number;
  likes: number;
}

export interface ICategory {
  id: string;
  category: string;
  description?: string;
  goods: IGood[];
}

interface ITreeListProps {
  dataSource: ICategory[];
}

@observer
export default class TreeList extends React.Component<ITreeListProps> {

  @computed
  get Categories() {
    const list = this.props.dataSource.map(({ id, category }) => (
      <Item key={ id }>
        { category }
      </Item>
    ));
    return (<List>{ list }</List>);
  }

  @computed
  get Products() {
    const list = this.props.dataSource.map(({ id, category, description, goods }) => {
      const renderHeader = () => (
        <span><strong>{ category }</strong>{ description }</span>
      );
      const renderGoods = goods.map((good) => (
        <Item key={ good.id } align={ 'top' } multipleLine={ true }>
          <div className={ styles.meta }>
            <div className={ styles.product_img }>
              <img src={ good.imageUrl } alt={ good.name }/>
            </div>
            <div className={ styles.content }>
              <div className={ styles.title }>{ good.name }</div>
              <div className={ styles.brief }>{ good.description }</div>
              <div className={ styles.brief }>月售{ good.salesPerMonth } 赞{ good.likes }</div>
              <div className={ styles.price_container }>
                <div className={ styles.price }>{ good.price }</div>
                <div className={ styles.plus }>+</div>
              </div>
            </div>
          </div>
        </Item>
      ));
      return (
        <List key={ id } renderHeader={ renderHeader }>
          { renderGoods }
        </List>
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
