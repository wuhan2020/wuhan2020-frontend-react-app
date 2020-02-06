import * as React from "react";
import * as _ from "lodash";
import { IApplicationState } from "../../../store";
import { bindActionCreators } from "redux";
import styles from "../../../styles/pages/travel-hotel/list.module.scss";
import Message from "../../Message";
import {
  actionCreators,
  Actions as TravelHotelActions
} from "../../../store/TravelHotel/actions";
import { withRouter, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import { Row, Col, Layout, Tabs, Input, Pagination } from "antd";
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

interface ContentState {
  selectedProvince: string;
  selectedCity: string;
  searchedText: string;
  current: number;
  pageSize: number;
  total: number;
  showedHotels: ITravelHotel[];
}

type InternalProps = ConnectedProps & RouteComponentProps;

class TravelHotelContext extends React.PureComponent<
  InternalProps,
  ContentState
> {
  constructor(props: InternalProps) {
    super(props);
    this.state = {
      selectedProvince: "",
      selectedCity: "",
      searchedText: "",
      current: 1,
      pageSize: 6,
      total: 0
    } as ContentState;
  }
  static defaultProps: Partial<InternalProps> = {
    selectedProvince: "",
    selectedCity: "",
    searchedText: "",
    provinceList: [] as IOption[],
    cityList: [] as IOption[],
    hotelList: [] as ITravelHotel[]
  };

  componentDidMount() {
    this.props.actions.fetchProvinces();
    this.props.actions.fetchHotels();
  }

  static getDerivedStateFromProps(
    nextProps: InternalProps,
    prevState: ContentState
  ) {
    const {
      hotelList,
      selectedProvince,
      selectedCity,
      searchedText
    } = nextProps;
    const { current, pageSize } = prevState;
    const newList = hotelList.slice(
      (current - 1) * pageSize,
      current * pageSize
    );
    const newState = {
      selectedProvince,
      selectedCity,
      searchedText,
      showedHotels: newList,
      total: hotelList.length
    };

    if (
      selectedProvince !== prevState.selectedProvince ||
      selectedCity !== prevState.selectedCity ||
      searchedText !== searchedText
    ) {
      Object.assign(newState, {
        current: 1
      });
    }

    return newState;
  }

  onHotelFilterChange = province => {
    this.props.actions.changeFilter({
      selectedProvince: province,
      selectedCity: ""
    });
    this.props.actions.fetchCities(province);
    this.fetchHotels({
      selectedProvince: province,
      selectedCity: ""
    });
  };
  onCityFilterChange = city => {
    this.props.actions.changeFilter({
      selectedCity: city
    });
    this.fetchHotels({
      selectedCity: city
    });
  };

  onTextChange = e => {
    const { value } = e.target;
    this.props.actions.changeFilter({
      searchedText: value
    });
    this.fetchHotels({
      searchedText: value
    });
  };

  fetchHotels = _.debounce(filter => {
    this.props.actions.fetchHotels(filter);
  }, 500);

  onSearch = () => {
    this.props.actions.fetchHotels();
  };

  handleChangePage = (page, pageSize) => {
    this.setState({
      current: page,
      pageSize
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
    const { current, pageSize, total, showedHotels } = this.state;

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
                placeholder={this.props.intl.formatMessage({
                  id: "SEARCH_TRAVEL_HOTEL"
                })}
                onChange={this.onTextChange}
                onSearch={this.onSearch}
                style={{ width: 200 }}
              />
            </Col>
            <Col lg={6} />
          </Row>
        </div>
        <div className={styles.listWrapper}>
          <Row
            style={{ maxWidth: "100%", marginBottom: "30px" }}
            type="flex"
            gutter={isMobile ? 0 : 30}
          >
            {_.map(showedHotels, (hotel, index) => {
              return (
                <Col
                  style={{padding: '5px'}}
                  className={styles.cardCol}
                  key={`travelhotel_col_${index}`}
                  lg={8}
                  sm={24}
                  xs={24}
                >
                  <TravelHotelCard
                    key={`travelhotel_${index}`}
                    history={this.props.history}
                    travelhotel={hotel}
                  />
                </Col>
              );
            })}
          </Row>
        </div>
        <div className={styles.pagination}>
          <Pagination
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={this.handleChangePage}
          />
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
