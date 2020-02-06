import { Reducer } from "redux";
import * as React from "react";
import * as Actions from "./actions";
import * as _ from "lodash";
import { isActionType } from "../../common/StrongAction";
import { IOption } from "../../types/interfaces";
import { hotelData } from "../../mockData/travel_hotel";

import { ITravelHotel, IContact } from "../../types/interfaces";

export interface TravelHotelState {
  selectedProvince: string;
  selectedCity: string;
  searchedText: string;
  provinceList: Array<IOption>;
  cityList: Array<IOption>;
  hotelList: ITravelHotel[];
}

export const initialTravelHotelState: TravelHotelState = {
  selectedProvince: "",
  selectedCity: "",
  searchedText: "",
  provinceList: [],
  cityList: [],
  hotelList: [] as ITravelHotel[]
};

const provinces = _.uniq(
  _.map(hotelData, item => {
    return item.province;
  })
);

const provinceMap = {};
_.each(hotelData, item => {
  const { province, city } = item;

  if (!provinceMap[province]) {
    provinceMap[province] = [];
  }
  provinceMap[province].push(item);
});
_.each(provinceMap, (arr, province) => {
  provinceMap[province] = _.uniq(
    _.map(arr, item => {
      return item.city;
    })
  );
});

const TravelHotelReducer: Reducer<TravelHotelState> = (
  state: TravelHotelState,
  act
) => {
  if (isActionType(act, Actions.FetchHotelsAction)) {
    const { selectedProvince, selectedCity, searchedText } = Object.assign(
      {},
      state,
      act.filter
    );
    const hotels = _.filter(hotelData, hotel => {
      const provinceFilter = selectedProvince
        ? hotel.province === selectedProvince
        : true;
      const cityFilter = selectedCity
        ? _.includes(hotel.city, selectedCity)
        : true;
      const textFilter = searchedText
        ? _.includes(JSON.stringify(hotel), searchedText)
        : true;

      return provinceFilter && cityFilter && textFilter;
    });
    return Object.assign({}, state, {
      hotelList: hotels
    });
  } else if (isActionType(act, Actions.FetchProvincesAction)) {
    return Object.assign({}, state, {
      provinceList: _.map(provinces, province => {
        return {
          key: province,
          value: province
        } as IOption;
      }),
    });
  } else if (isActionType(act, Actions.FetchCitiesAction)) {
    const { province } = act;
    const cities = provinceMap[province];

    return Object.assign({}, state, {
      cityList: _.map(cities, city => {
        return {
          key: city,
          value: city
        } as IOption;
      })
    });
  } else if (isActionType(act, Actions.ChangeFilterAction)) {
    const { selectedProvince, selectedCity, searchedText } = state;
    return Object.assign({}, state, act.filter);
  }

  return state || initialTravelHotelState;
};

export default TravelHotelReducer;
