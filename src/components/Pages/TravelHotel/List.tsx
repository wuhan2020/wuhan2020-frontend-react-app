import * as React from "react";
import styles from "../../../styles/pages/travel-hotel/list.module.scss";
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Row, Col, Layout, Tabs } from "antd";
import TravelHotelContext from "./Content";
import { actionCreators, Actions as TravelHotelActions } from "../../../store/TravelHotel/actions";
import { AppState } from "../../../store/App";

const { TabPane } = Tabs;
const tabConfig = [
  {
    key: "doctor",
    title: "湖北医护人员"
  },
  {
    key: "other",
    title: "武汉在外人士"
  }
];

interface ConnectedProps {
  app: AppState;
  actions: TravelHotelActions;
  loading: boolean;
}

interface Props extends RouteComponentProps {}
const { Content } = Layout;

class TravelHotelList extends React.PureComponent<Props, {}> {
  public props: ConnectedProps & Props;
  componentWillMount() {
    console.log(this.props.app.dataSource);
    this.props.app.dataSource && this.props.actions.fetchTravelHotelList(this.props.app.dataSource['travel_hotel']);
  }

  onHotelFilterChange = () => {};

  render() {
    return (
      <Layout
        style={{
          backgroundColor: "#fff",
          flex: "1 0 auto",
          minHeight: "unset"
        }}
      >
        <Content>
          <div className={styles.pageTravelHotelList}>
            <header>
              <div className={styles.title}>{Message("TRAVEL_HOTEL_PAGE_TITLE")}</div>
            </header>
            <TravelHotelContext />
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    app: state.app,
    loading: state.app.loading,
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators({
      ...actionCreators,
    }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(TravelHotelList));

/*

            <Tabs tabBarStyle={{width: '100%'}}>
              {_.map(tabConfig, config => {
                const { key, title } = config;
                return (
                  <TabPane key={key} tab={title}>
                  </TabPane>
                );
              })}
            </Tabs>
*/