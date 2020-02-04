import * as React from "react";
import { typeName, StrongAction } from "../../common/StrongAction";
import { ITravelHotel } from "../../types/interfaces";
import { hotelData } from "../../mockData/travel_hotel";

const SUFFIX = "__HOTEL";

@typeName("CHANGE_FILTER" + SUFFIX)
export class ChangeFilterAction extends StrongAction {
  constructor(public filter = {}) {
    super();
  }
}

@typeName("FETCH_HOTELS" + SUFFIX)
export class FetchHotelsAction extends StrongAction {
  constructor(public filter = {}) {
    super();
  }
}

export const actionCreators = {
  fetchHotels: (filter: {
    selectedProvice?: string;
    selectedCity?: string;
    searchedText?: string;
  }): any => {
    return dispatch => {
      dispatch(new FetchHotelsAction(filter));
    };
    return hotelData as ITravelHotel[];
  },
  changeFilter: (filter: {
    selectedProvice?: string;
    selectedCity?: string;
    searchedText?: string;
  }): any => {
    return dispatch => {
      dispatch(new ChangeFilterAction(filter));
    };
  }
};
