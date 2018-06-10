import stores from '@/stores';
import { configure } from 'mobx';
import { observer, Provider } from 'mobx-react';
import React from 'react';

configure({
  enforceActions: true
});

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
