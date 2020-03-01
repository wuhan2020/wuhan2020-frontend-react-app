import * as React from 'react';
import styles from '../../../styles/pages/logistics/list.module.scss';
import Message from '../../Message';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IApplicationState } from '../../../store';
import { withRouter, RouteComponentProps } from 'react-router';
import { Layout, Row, Col, Input, Pagination } from 'antd';
import {
  actionCreators as logisticsActionCreators,
  Actions as LogisticActions,
} from '../../../store/Logistics/action';
import Select from '../../../components/Elements/Select';
import { AppState } from '../../../store/App';
import { LogisticsState, makeFilteredLogisticsSelector } from '../../../store/Logistics';
import { ILogistic } from '../../../types/interfaces';
import Option from '../../../components/Elements/Select/Option';
import { Search } from '../../../components/Elements/Input';
import { injectIntl, IntlShape } from 'react-intl';
import LogisticsCard from '../../../components/Elements/Logistics/Card';
import { isMobile } from '../../../utils/deviceHelper';

interface ConnectedProps {
  actions: LogisticActions;
  app: AppState;
  loading: boolean;
  logisticState: LogisticsState;
  logisticList: ILogistic[];
  intl: IntlShape;
}

interface Props extends RouteComponentProps {}

const { Content } = Layout;
// const InputGroup = Input.Group;
class LogisticsList extends React.PureComponent<Props, {}> {
  public props: ConnectedProps & Props;
  componentWillMount() {
    this.props.app.dataSource &&
      this.props.actions.fetchLogisticList(this.props.app.dataSource['logistical']);
  }
  componentDidMount() {}

  onNewClick = () => {};
  onUpdateSendPlaceChange = value => {
    this.props.actions.updateSendPlace(value);
  };
  onLogisticSearch = searchText => {
    this.props.actions.searchLogistic(searchText);
  };

  onPageChange = page => {
    this.props.actions.updateCurrentPage(page);
  };

  onUpdateChanelChange = value => {};

  render() {
    const { logisticList, logisticState } = this.props;
    const { channelList, sendPlaceList, pageSize, currentPage } = logisticState;
    const currentLogisticList = isMobile
      ? logisticList
      : logisticList.slice(0 + (currentPage - 1) * pageSize, currentPage * pageSize);
    return (
      <Layout style={{ backgroundColor: '#fff', flex: '1 0 auto', minHeight: 'unset' }}>
        <Content>
          <div className={styles.pageLogisticsList}>
            <h3>{Message('LOGISTICS_TITLE')}</h3>
            <section>
              <Row type="flex" justify="center">
                <Col lg={4} sm={24} xs={24}>
                  <div className={styles.selectGroup}>
                    <Select
                      size="large"
                      defaultValue={channelList[0].value}
                      className={styles.select}
                      onChange={this.onUpdateChanelChange}
                    >
                      {channelList.map(obj => (
                        <Option key={obj.value} value={obj.value}>
                          {obj.description}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      size="large"
                      defaultValue={sendPlaceList[0].value}
                      className={styles.select}
                      onChange={this.onUpdateSendPlaceChange}
                    >
                      {sendPlaceList.map(d => (
                        <Option key={d.value} value={d.value}>
                          {d.description}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </Col>
                <Col lg={10} sm={24} xs={24}>
                  <Search
                    size="large"
                    className={styles.search}
                    placeholder={this.props.intl.formatMessage({ id: 'SEARCH_LOGISTICS' })}
                    onSearch={this.onLogisticSearch}
                  />
                </Col>
              </Row>
            </section>
            <section>
              <Row
                style={{ marginTop: '26px', maxWidth: '100%' }}
                type="flex"
                gutter={isMobile ? 0 : 24}
              >
                {currentLogisticList.map((item, index) => {
                  return (
                    <Col key={`logistic_${index}`} lg={8} sm={24} xs={24}>
                      <LogisticsCard data={item} />
                    </Col>
                  );
                })}
              </Row>
              {!isMobile && (
                <Row type="flex" justify="center">
                  <Pagination
                    current={currentPage}
                    defaultCurrent={1}
                    total={logisticList.length}
                    pageSize={pageSize}
                    onChange={this.onPageChange}
                  />
                </Row>
              )}
            </section>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  const filteredLogisticsSelector = makeFilteredLogisticsSelector();
  return {
    loading: state.app.loading,
    app: state.app,
    logisticState: state.logistics,
    logisticList: filteredLogisticsSelector(state),
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...logisticsActionCreators,
      },
      dispatch
    ),
  };
};

export default injectIntl(
  connect(mapStateToProps, mapActionsToProps)(withRouter(LogisticsList)) as any
) as any;
