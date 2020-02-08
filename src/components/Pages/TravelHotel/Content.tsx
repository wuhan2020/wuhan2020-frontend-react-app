import * as React from "react";
import { IApplicationState } from "../../../store";
import { bindActionCreators } from "redux";
import styles from "../../../styles/pages/travel-hotel/list.module.scss";
import { actionCreators, Actions as TravelHotelActions } from "../../../store/TravelHotel/actions";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { Col, Input, Row } from "antd";
import Select from "../../../components/Elements/Select";
import Option from "../../../components/Elements/Select/Option";
import { IOption, ITravelHotel, ICity } from "../../../types/interfaces";
import TravelHotelCard from "../../Elements/TravelHotel";
import { injectIntl, IntlShape } from "react-intl";
import { isMobile } from "../../../utils/deviceHelper";
import { DEFAULT_CITY, DEFAULT_PROVINCE, makeFilteredCitiesSelector, makeFilteredHotelsSelector } from '../../../store/TravelHotel';

const { Search } = Input;

interface ConnectedProps {
  selectedProvince: string;
  selectedCity: string;
  searchedText: string;
  provinceList: IOption[];
  cityList: ICity[];
  hotelList: ITravelHotel[];
  actions: TravelHotelActions;
  intl: IntlShape;
}

type InternalProps = ConnectedProps & RouteComponentProps;

class TravelHotelContext extends React.PureComponent<InternalProps, {}> {
  static defaultProps: Partial<InternalProps> = {
    selectedProvince: DEFAULT_PROVINCE.key,
    selectedCity: DEFAULT_CITY.key,
    searchedText: "",
    provinceList: [DEFAULT_PROVINCE],
    cityList: [DEFAULT_CITY],
    hotelList: [] as ITravelHotel[]
  };
  
  onProvinceFilterChange = province => {
    this.props.actions.changeFilter({
      selectedProvince: province,
      selectedCity: DEFAULT_CITY.key,
    });
  };

  onCityFilterChange = city => {
    this.props.actions.changeFilter({
      selectedCity: city,
    });
  };

  onTextChange = e => {
    const { value } = e.target;
    this.props.actions.changeFilter({
      searchedText: value,
    });
  };

  onSearch = e => {
    const { value } = e.target;
    this.props.actions.changeFilter({
      searchedText: value,
    });
  };

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
          <Row gutter={16} type='flex' justify='center'>
            <Col lg={4} sm={12} xs={12}>
              <Select
                defaultValue={0}
                className={styles.selectField}
                value={selectedProvince}
                onChange={this.onProvinceFilterChange}
              >
                {provinceList.map((province, index) => {
                  const { key, value } = province;
                  return <Option key={`province_${key}`} value={key}>{value}</Option>;
                })}
              </Select>
            </Col>
            <Col lg={4} sm={12} xs={12}>
              <Select
                defaultValue={0}
                className={styles.selectField}
                value={selectedCity}
                onChange={this.onCityFilterChange}
              >
                {cityList.map((city, index) => {
                  const { key, name } = city;
                  return <Option key={`city_${key}`} value={name}>{name}</Option>;
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
              />
            </Col>
          </Row>
        </div>
        <div className={styles.listWrapper}>
          <Row style={{ maxWidth: "100%", marginBottom: '30px' }} type="flex" gutter={isMobile ? 0 : 30}>
            {hotelList.map((hotel, index) => {
              return (
                <Col
                  style={{ maxWidth: "100%", marginBottom: '30px' }}
                  key={`travelhotel_${index}`}
                  xxl={8} xl={12} xs={24}
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
  const filteredCities = makeFilteredCitiesSelector();
  const filteredHotels = makeFilteredHotelsSelector();

  const {
    selectedProvince,
    selectedCity,
    searchedText,
    provinceList,
  } = state.travelHotel;
  return {
    selectedProvince,
    selectedCity,
    searchedText,
    provinceList,
    cityList: filteredCities(state),
    hotelList: filteredHotels(state),
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
