import { Reducer } from "redux";
import * as React from "react";
import * as Actions from "./actions";
import { isActionType } from "../../common/StrongAction";

import { IHotel, IContact } from "../../types/interfaces";

export interface TravelHotelState {
  selectedProvice: string;
  selectedCity: string;
  searchedText: string;
  hotelList: IHotel[];
}

export const initialTravelHotelState: TravelHotelState = {
  selectedProvice: "",
  selectedCity: "",
  searchedText: "",
  hotelList: [] as IHotel
};

const TravelHotelReducer: Reducer<TravelHotelState> = (
  state: TravelHotelState,
  act
) => {
  if (isActionType(act, Actions.fetchHotels)) {
    return Object.assign(state, {
      hotelList: act.value
    });
  } else if (isActionType(act, Actions.changeFilter)) {
    return Object.assign(state, act.value);
  }

  return state || initialTravelHotelState;
};

export default TravelHotelReducer;
