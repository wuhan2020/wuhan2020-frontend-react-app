import * as React from "react";
import * as _ from "lodash";
import styles from "../../../styles/pages/travel-hotel/list.module.scss";
import Message from "../../Message";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { IApplicationState } from "../../../store";
import { withRouter, RouteComponentProps } from "react-router";
import { Row, Col, Layout, Tabs } from "antd";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import TravelHotelContext from "./Content";
// import TravelHotelCard from "../../../components/Elements/TravelHotel/index";

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
  loading: boolean;
}

interface Props extends RouteComponentProps {}
const { Content } = Layout;

class TravelHotelList extends React.PureComponent<Props, {}> {
  public props: ConnectedProps & Props;
  componentDidMount() {}

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
              <div className={styles.title}>{Message("CLINIC_PAGE_TITLE")}</div>
            </header>
            <Tabs>
              {_.map(tabConfig, config => {
                const { key, title } = config;
                return (
                  <TabPane key={key} tab={title}>
                    <TravelHotelContext />
                  </TabPane>
                );
              })}
            </Tabs>
          </div>
        </Content>
      </Layout>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {
    loading: state.app.loading
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators({}, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(TravelHotelList));
