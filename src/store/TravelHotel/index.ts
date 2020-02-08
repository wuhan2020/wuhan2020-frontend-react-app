import { Reducer } from "redux";
import * as Actions from "./actions";
import { isActionType } from "../../common/StrongAction";
import { IOption, ICity } from "../../types/interfaces";
import { IApplicationState } from "..";
import { createSelector } from "reselect";

import { ITravelHotel } from "../../types/interfaces";

export const DEFAULT_CITY: ICity = {key: '全部市区', name: '全部市区', parentProvince: ''};
export const DEFAULT_PROVINCE = {key: '全部省份', value: '全部省份'};

export interface TravelHotelState {
  selectedProvince: string;
  selectedCity: string;
  searchedText: string;
  provinceList: IOption[];
  cityList: ICity[];
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

const hotelsSelector = (state: IApplicationState) => state.travelHotel.hotelList;
const citiesSelector = (state: IApplicationState) => state.travelHotel.cityList;
const selectedProvinceSelector = (state: IApplicationState) => state.travelHotel.selectedProvince;
const selectedCitySelector = (state: IApplicationState) => state.travelHotel.selectedCity;
const hotelFilterTextSelector = (state: IApplicationState) => state.travelHotel.searchedText;

export const makeFilteredCitiesSelector = () => {
	return createSelector(
		[citiesSelector, selectedProvinceSelector],
		(cities: ICity[], selectedProvince: string) => {
      if (!cities) return [];
			return cities.filter((c) => c.parentProvince === selectedProvince);
		}
	)
}

export const makeFilteredHotelsSelector = () => {
  return createSelector(
    [hotelsSelector, selectedProvinceSelector, selectedCitySelector, hotelFilterTextSelector],
    (hotels: ITravelHotel[], selectedProvince: string, selectedCity: string, filteredText: string) => {
      if (!hotels) return [];
      const dropDownFiltered = hotels.filter((h) => {
        // @todo - when backend support, use id for this
        if (selectedProvince === '全部省份') return true;
        // @todo - when backend support, use id for this
        if (selectedCity === '全部市区') {
          return h.province === selectedProvince;
        } else {
          return h.province === selectedProvince && h.city === selectedCity;
        }
      });

      if (!filteredText) return dropDownFiltered;
      return dropDownFiltered.filter((h) => {
        return h.name.includes(filteredText);
      })
    }
  )
}

const TravelHotelReducer: Reducer<TravelHotelState> = (
  state: TravelHotelState,
  act
) => {
  if (isActionType(act, Actions.UpdateTravelHotelList)) {
    return {
      ...state,
      hotelList: act.hotels,
      provinceList: [DEFAULT_PROVINCE, ...act.provinces],
      cityList: [DEFAULT_CITY, ...act.cities],
    };
  } else if (isActionType(act, Actions.ResetAction)) {
    return initialTravelHotelState;
  } else if (isActionType(act, Actions.ChangeFilterAction)) {
    return Object.assign({}, state, act.filter);
  }

  return state || initialTravelHotelState;
};

export default TravelHotelReducer;
