import * as React from "react";
import { typeName, StrongAction } from "../../common/StrongAction";
import { IHotel } from "../../types/interfaces";
import { hotelData } from "../../mockData/travel_hotel";

const SUFFIX = "__HOTEL";

@typeName("CHANGE_FILTER" + SUFFIX)
export class ChangeFilterActions extends StrongAction {
  constructor(public filter = {}) {
    super();
  }
}

export const actionCreators = {
  fetchHotels: (filter: {
    provice?: string;
    city?: string;
    searchedText: string;
  }): IHotel[] => {
    return hotelData as IHotel[];
  },
  changeFilter: (value = {}): any => {
    return dispatch => {
      dispatch(new ChangeFilterActions(value));
    };
  }
};
