import stores from '@/stores';
import { configure } from 'mobx';
import { observer, Provider } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';

configure({
  enforceActions: true
});

interface IAppLayout extends RouteConfigComponentProps<{}> {
}

@observer
export default class AppLayout extends React.Component<IAppLayout> {

  componentDidMount() {
    stores.$global.setTable(
      Math.floor(1 + Math.random() * 10)
    );
  }

  render() {
    return (
      <Provider { ...stores }>
        { this.props.children }
      </Provider>
    );
  }
}
