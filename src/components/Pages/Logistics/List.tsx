import * as React from 'react';
import styles from '../../../styles/pages/logistics/list.module.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { IApplicationState } from '../../../store';
import { withRouter, RouteComponentProps } from 'react-router';
import { Row, Col } from 'antd';
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
import DetailDrawer from '../../../components/Elements/Logistics/DetailDrawer';
import { isMobile } from '../../../utils/deviceHelper';
import Pagination from '../../../components/Elements/Pagination';

interface ConnectedProps {
  actions: LogisticActions;
  app: AppState;
  loading: boolean;
  logisticState: LogisticsState;
  logisticList: ILogistic[];
  intl: IntlShape;
}

interface Props extends RouteComponentProps {}

class LogisticsList extends React.PureComponent<Props, {}> {
  public props: ConnectedProps & Props;
  public detailDrawerRef: any;

  componentWillMount() {
    this.props.app.dataSource &&
      this.props.actions.fetchLogisticList(this.props.app.dataSource['logistical']);
  }

  onNewClick = () => {};

  onUpdateSendPlaceChange = (value: number): void => {
    this.props.actions.updateSendPlace(value);
  };

  onLogisticSearch = (searchText: string): void => {
    this.props.actions.searchLogistic(searchText);
  };

  onPageChange = (page: number): void => {
    this.props.actions.updateCurrentPage(page);
  };

  onUpdateChanelChange = (value: number): void => {
    this.props.actions.updateChannel(value);
  };

  onLogisticsCardClick = (data: ILogistic): void => {
    this.detailDrawerRef.show(data);
  };

  render() {
    const { logisticList, logisticState } = this.props;
    const { channelList, sendPlaceList, pageSize, currentPage } = logisticState;
    return (
      <div className={styles.pageLogisticsList}>
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
                    <Option key={`channel_${obj.value}`} value={obj.value}>
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
                    <Option key={`place_${d.value}`} value={d.value}>
                      {d.description}
                    </Option>
                  ))}
                </Select>
              </div>
            </Col>
            <Col lg={6} sm={24} xs={24}>
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
            {logisticList.map((item, index) => {
              return (
                <Col key={`logistic_${index}`} lg={8} sm={24} xs={24}>
                  <LogisticsCard data={item} onClick={this.onLogisticsCardClick} />
                </Col>
              );
            })}
          </Row>
          {!isMobile && (
            <Row type="flex" justify="center">
              <Pagination
                current={currentPage}
                defaultCurrent={1}
                total={logisticState.list.length}
                pageSize={pageSize}
                onChange={this.onPageChange}
              />
            </Row>
          )}
        </section>
        <DetailDrawer ref={ref => (this.detailDrawerRef = ref)} />
      </div>
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
