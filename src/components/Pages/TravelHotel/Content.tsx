import * as React from "react";
import * as _ from "lodash";
import { IApplicationState } from "../../../store";
import { bindActionCreators } from "redux";
import {
  actionCreators,
  Actions as TravelHotelActions
} from "../../../store/TravelHotel/actions";
import styles from "../../../styles/pages/travel-hotel/list.module.scss";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { Row, Col, Layout, Tabs, Input } from "antd";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import { hotelData } from "../../../mockData/travel_hotel";
import { IOption } from "../../../types/interfaces";

const { Search } = Input;

interface ConnectedProps {
  selectedProvince: string;
  selectedCity: string;
  searchedText: string;
  provinceList: IOption[];
  cityList: IOption[];
  actions: TravelHotelActions;
}

type InternalProps = ConnectedProps & RouteComponentProps;

class TravelHotelContext extends React.PureComponent<InternalProps, {}> {
  static defaultProps: Partial<InternalProps> = {
    selectedProvince: "",
    selectedCity: "",
    searchedText: "",
    provinceList: [] as IOption[],
    cityList: [] as IOption[]
  };

  onHotelFilterChange = province => {
    this.props.actions.changeFilter({
      selectedProvince: province,
      selectedCity: ""
    });
    this.props.actions.fetchCities(province);
  };
  onCityFilterChange = city => {
    this.props.actions.changeFilter({
      selectedCity: city
    });
  };

  onSearch = e => {
    const { value } = e.target;
    this.props.actions.changeFilter({
      searchedText: value
    });
  };

  componentDidMount() {
    this.props.actions.fetchProvinces();
  }

  render() {
    const {
      selectedProvince,
      selectedCity,
      searchedText,
      provinceList,
      cityList
    } = this.props;

    return (
      <div>
        <div>
          <Row>
            <Col lg={6} />
            <Col lg={3} sm={12}>
              <Select
                value={selectedProvince}
                onChange={this.onHotelFilterChange}
                className={styles.cityFilter}
              >
                {_.map(provinceList, (province, index) => {
                  const { key, value } = province;
                  return (
                    <Option key={`province_${index}`} value={key}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col lg={3} sm={12}>
              <Select
                value={selectedCity}
                onChange={this.onCityFilterChange}
                className={styles.cityFilter}
              >
                {_.map(cityList, (city, index) => {
                  const { key, value } = city;
                  return (
                    <Option key={`city_${index}`} value={key}>
                      {value}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col lg={6} sm={12}>
              <Search
                value={searchedText}
                placeholder="input search text"
                onChange={this.onSearch}
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
  const {
    selectedProvince,
    selectedCity,
    searchedText,
    provinceList,
    cityList
  } = state.travelHotel;
  return {
    selectedProvince,
    selectedCity,
    searchedText,
    provinceList,
    cityList
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actionCreators }, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(TravelHotelContext));
