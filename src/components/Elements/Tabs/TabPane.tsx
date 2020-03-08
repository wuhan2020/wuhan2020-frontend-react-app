import * as React from 'react';
import '../../../styles/elements/tabs/tabpane.scss';
import { Tabs } from 'antd';
import { TabPaneProps as AntDTabPaneProps } from 'antd/lib/tabs';

interface TabPaneProps extends AntDTabPaneProps {}

export default class TabPane extends React.PureComponent<TabPaneProps, {}> {
  render() {
    return React.cloneElement(<Tabs.TabPane />, { ...this.props });
  }
}
