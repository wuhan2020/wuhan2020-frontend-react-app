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
@typeName("FETCH_PROVINCES" + SUFFIX)
export class FetchProvincesAction extends StrongAction {
  constructor() {
    super();
  }
}
@typeName("FETCH_CITIES" + SUFFIX)
export class FetchCitiesAction extends StrongAction {
  constructor(public province = "") {
    super();
  }
}

export interface Actions {
  fetchProvinces();
  fetchCities(province: string);
  fetchHotels(filter?: {
    selectedProvince?: string;
    selectedCity?: string;
    searchedText?: string;
  });
  changeFilter(filter: {
    selectedProvince?: string;
    selectedCity?: string;
    searchedText?: string;
  });
}

export const actionCreators = {
  fetchProvinces() {
    return dispatch => {
      dispatch(new FetchProvincesAction());
    };
  },
  fetchCities(province) {
    return dispatch => {
      dispatch(new FetchCitiesAction(province));
    };
  },
  fetchHotels(filter = {}) {
    return dispatch => {
      dispatch(new FetchHotelsAction(filter));
    };
  },
  changeFilter(filter: {
    selectedProvince?: string;
    selectedCity?: string;
    searchedText?: string;
  }) {
    return dispatch => {
      dispatch(new ChangeFilterAction(filter));
    };
  }
};
