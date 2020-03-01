import * as React from 'react';
import { injectIntl } from 'react-intl';
import { Layout } from 'antd';
import Message from '../../../components/Message';
import styles from '../../../styles/pages/logistics/index.module.scss';
import Tabs from '../../Elements/Tabs';
import TabPane from '../../Elements/Tabs/TabPane';
import List from './List';
import Check from './Check';

const { Content } = Layout;

class LogisticsIndex extends React.PureComponent<{}, {}> {
  render() {
    return (
      <Layout style={{ backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset' }}>
        <Content>
          <div className={styles.pageLogisticsIndex}>
            <h3>{Message('LOGISTICS_TITLE')}</h3>
            <Tabs>
              <TabPane tab={Message('LOGISTICS_CHECT')} key="list">
                <List />
              </TabPane>
              <TabPane tab={Message('LOGISTICS_FOLLOW')} key="search">
                <Check />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    );
  }
}

export default injectIntl(LogisticsIndex) as any;
