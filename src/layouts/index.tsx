import stores from '@/stores';
import { observer, Provider } from 'mobx-react';
import React from 'react';

@observer
export default class AppLayout extends React.Component<{}> {
  render() {
    return (
      <Provider { ...stores }>
        { this.props.children }
      </Provider>
    );
  }
}
