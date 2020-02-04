import * as React from "react";
import * as _ from "lodash";
import { IApplicationState } from "../../../store";
import styles from "../../../styles/pages/travel-hotel/list.module.scss";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Row, Col, Layout, Tabs, Input } from "antd";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import { hotelData } from "../../../mockData/travel_hotel";

const { Search } = Input;
interface Props extends RouteComponentProps {}

class TravelHotelContext extends React.PureComponent<Props, {}> {
  onHotelFilterChange = () => {};
  onSearch = () => {};

  render() {
    return (
      <div>
        <div>
          <Row>
            <Col lg={6} />
            <Col lg={3} sm={12}>
              <Select
                onChange={this.onHotelFilterChange}
                className={styles.cityFilter}
              />
            </Col>
            <Col lg={3} sm={12}>
              <Select
                onChange={this.onHotelFilterChange}
                className={styles.cityFilter}
              />
            </Col>
            <Col lg={6} sm={12}>
              <Search
                placeholder="input search text"
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
              />
            </Col>
            <Col lg={6} />
          </Row>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IApplicationState) => {
  return {};
};

const mapActionsToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(TravelHotelContext));
