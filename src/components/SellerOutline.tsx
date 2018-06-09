import { Icon, NavBar } from 'antd-mobile';
import classnames from 'classnames';
import { computed } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './SellerOutline.less';

interface ISellerOutlineProps {
  logoUrl: string;
  title: string;
  description: string;
}

@observer
export default class SellerOutline extends React.Component<ISellerOutlineProps> {

  @computed
  get withImage() {
    return {
      backgroundImage: `url(${this.props.logoUrl})`
    };
  }

  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.detail_container }>
          <div style={ this.withImage } className={ styles.logo }/>
          <div className={ styles.meta }>
            <span className={ styles.title }>{ this.props.title }</span>
            <div className={ styles.description }>{ this.props.description }</div>
          </div>
        </div>
        <div className={ styles.container_blur_wrapper }>
          <div style={ this.withImage } className={ styles.container_blur }/>
        </div>
      </div>
    );
  }
}
