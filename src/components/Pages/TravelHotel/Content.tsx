import * as React from "react";
import * as _ from "lodash";
import { IApplicationState } from "../../../store";
import { bindActionCreators } from "redux";
import styles from "../../../styles/pages/travel-hotel/list.module.scss";
import {
  actionCreators,
  Actions as TravelHotelActions
} from "../../../store/TravelHotel/actions";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { Row, Col, Layout, Tabs, Input } from "antd";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import { IOption, ITravelHotel } from "../../../types/interfaces";
import TravelHotelCard from "../../Elements/TravelHotel";
import { injectIntl, IntlShape } from "react-intl";
import { isMobile } from "../../../utils/deviceHelper";

const { Search } = Input;

interface ConnectedProps {
  selectedProvince: string;
  selectedCity: string;
  searchedText: string;
  provinceList: IOption[];
  cityList: IOption[];
  hotelList: ITravelHotel[];
  actions: TravelHotelActions;
  intl: IntlShape;
}

type InternalProps = ConnectedProps & RouteComponentProps;

class TravelHotelContext extends React.PureComponent<InternalProps, {}> {
  static defaultProps: Partial<InternalProps> = {
    selectedProvince: "",
    selectedCity: "",
    searchedText: "",
    provinceList: [] as IOption[],
    cityList: [] as IOption[],
    hotelList: [] as ITravelHotel[]
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

  onTextChange = e => {
    const { value } = e.target;
    this.props.actions.changeFilter({
      searchedText: value
    });
    this.fetchHotels();
  };

  fetchHotels = _.debounce(() => {
    this.props.actions.fetchHotels();
  }, 500);

  onSearch = () => {
    this.props.actions.fetchHotels();
  };

  componentDidMount() {
    this.props.actions.fetchProvinces();
    this.props.actions.fetchHotels();
  }

  render() {
    const {
      selectedProvince,
      selectedCity,
      searchedText,
      provinceList,
      cityList,
      hotelList
    } = this.props;

    return (
      <div className={styles.hotelContainer}>
        <div className={styles.filter}>
          <Row gutter={20}>
            <Col lg={4} sm={12} xs={12}>
              <Select
                defaultValue="0"
                className={styles.selectField}
                value={selectedProvince}
                onChange={this.onHotelFilterChange}
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
            <Col lg={4} sm={12} xs={12}>
              <Select
                defaultValue="0"
                className={styles.selectField}
                value={selectedCity}
                onChange={this.onCityFilterChange}
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
            <Col lg={8} sm={24} xs={24}>
              <Search
                className={styles.searchInput}
                value={searchedText}
                placeholder={this.props.intl.formatMessage({id: 'SEARCH_TRAVEL_HOTEL'})}
                onChange={this.onTextChange}
                onSearch={this.onSearch}
                style={{ width: 200 }}
              />
            </Col>
            <Col lg={6} />
          </Row>
        </div>
        <div className={styles.listWrapper}>
          <Row style={{ maxWidth: "100%", marginBottom: '30px' }} type="flex" gutter={isMobile ? 0 : 30}>
            {_.map(hotelList, (hotel, index) => {
              return (
                <Col
                  style={{ maxWidth: "100%", marginBottom: '30px' }}
                  key={`travelhotel_${index}`}
                  lg={8}
                  sm={24}
                  xs={24}
                >
                  <TravelHotelCard
                    history={this.props.history}
                    travelhotel={hotel}
                  />
                </Col>
              );
            })}
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
    cityList,
    hotelList
  } = state.travelHotel;
  return {
    selectedProvince,
    selectedCity,
    searchedText,
    provinceList,
    cityList,
    hotelList
  };
};

const mapActionsToProps = dispatch => {
  return {
    actions: bindActionCreators({ ...actionCreators }, dispatch)
  };
};

export default injectIntl(connect(
  mapStateToProps,
  mapActionsToProps
)(withRouter(TravelHotelContext)) as any) as any;