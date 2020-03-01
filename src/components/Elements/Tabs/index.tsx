import * as React from 'react';
import '../../../styles/elements/tabs/index.scss';
import { Tabs as AntDTabs } from 'antd';
import { TabsProps as AntDTabProps } from 'antd/lib/tabs';

interface TabsProps extends AntDTabProps {}

export default class Tabs extends React.PureComponent<TabsProps, {}> {
  render() {
    return React.cloneElement(<AntDTabs />, { ...this.props });
  }
}
