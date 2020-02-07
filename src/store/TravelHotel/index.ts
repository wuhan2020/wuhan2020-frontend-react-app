import { Reducer } from "redux";
import * as Actions from "./actions";
import * as _ from "lodash";
import { isActionType } from "../../common/StrongAction";
import { IOption } from "../../types/interfaces";
import { hotelData } from "../../mockData/travel_hotel";

import { ITravelHotel } from "../../types/interfaces";

function generateProvinceMap() {
  const provinceMap: any = {
    [DEFAULT_PROVINCE.key]: DEFAULT_PROVINCE,
  };
  hotelData.forEach((hotel: ITravelHotel) => {
    const { province, city } = hotel;
    if (!provinceMap[province]) {
      provinceMap[province] = {
        key: province,
        value: province,
        cityMap: {
          [DEFAULT_CITY.key]: DEFAULT_CITY,
        },
        cityList: [],
      };
    }
    provinceMap[province].cityMap[city] = {
      key: city,
      value: city,
    };
  });
  Object.values(provinceMap).forEach((province: any) => {
    const { cityMap = {} } = province;
    province.cityList = Object.values(cityMap);
  });
  return provinceMap;
}

export const DEFAULT_CITY = {key: '全部市区', value: '全部市区'};
export const DEFAULT_PROVINCE = {key: '全部省份', value: '全部省份', cityList: [DEFAULT_CITY]};
const provinceMap: any = generateProvinceMap();
const provinceList = Object.values(provinceMap);

export interface TravelHotelState {
  selectedProvince: string;
  selectedCity: string;
  searchedText: string;
  provinceList: IOption[];
  cityList: IOption[];
  hotelList: ITravelHotel[];
}

export const initialTravelHotelState: TravelHotelState = {
  selectedProvince: DEFAULT_PROVINCE.key,
  selectedCity: DEFAULT_CITY.key,
  searchedText: "",
  provinceList: [DEFAULT_PROVINCE],
  cityList: [DEFAULT_CITY],
  hotelList: [] as ITravelHotel[]
};

const TravelHotelReducer: Reducer<TravelHotelState> = (
  state: TravelHotelState,
  act
) => {
  if (isActionType(act, Actions.FetchHotelsAction)) {
    const { selectedProvince, selectedCity, searchedText } = state;
    // @todo - this part is ridiculous that we are mixing data source in state tree,
    // we need to refactor this to fetch data in action, and dispatch update action to push data
    // into state tree...
    // Please check other pages' implementation about how to fetch data correctly and cleanly.
    const hotels = _.filter(hotelData, hotel => {
      const provinceFilter = selectedProvince === DEFAULT_PROVINCE.key || hotel.province === selectedProvince;
      const cityFilter = selectedCity === DEFAULT_CITY.key || hotel.city === selectedCity;
      const textFilter = !searchedText || _.includes(JSON.stringify(hotel), searchedText);
      return provinceFilter && cityFilter && textFilter;
    });
    return Object.assign({}, state, {
      hotelList: hotels
    });
  } else if (isActionType(act, Actions.FetchProvincesAction)) {
    return Object.assign({}, state, {
      provinceList,
    });
  } else if (isActionType(act, Actions.FetchCitiesAction)) {
    if (!provinceMap[act.province]) {
      return Object.assign({}, state, {
        cityList: [DEFAULT_CITY],
      });
    }
    return Object.assign({}, state, {
      cityList: provinceMap[act.province].cityList,
    });
  } else if (isActionType(act, Actions.ChangeFilterAction)) {
    return Object.assign({}, state, act.filter);
  }

  return state || initialTravelHotelState;
};

export default TravelHotelReducer;
