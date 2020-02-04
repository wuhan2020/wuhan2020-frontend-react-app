import { Reducer } from "redux";
import * as React from "react";
import * as Actions from "./actions";
import { isActionType } from "../../common/StrongAction";

import { ITravelHotel, IContact } from "../../types/interfaces";

export interface TravelHotelState {
  selectedProvice: string;
  selectedCity: string;
  searchedText: string;
  hotelList: ITravelHotel[];
}

export const initialTravelHotelState: TravelHotelState = {
  selectedProvice: "",
  selectedCity: "",
  searchedText: "",
  hotelList: [] as ITravelHotel[]
};

const TravelHotelReducer: Reducer<TravelHotelState> = (
  state: TravelHotelState,
  act
) => {
  if (isActionType(act, Actions.FetchHotelsAction)) {
    return Object.assign(state, {
      hotelList: []
    });
  } else if (isActionType(act, Actions.ChangeFilterAction)) {
    return Object.assign(state, act.filter);
  }

  return state || initialTravelHotelState;
};

export default TravelHotelReducer;
