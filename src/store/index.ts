import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import AppReducer from "./App";
import ClinicReducer from "./Clinic";
import TravelHotelReducer from "./TravelHotel";
import DonateReducer from "./Donate";
import freeConsultationReducer from "./freeConsultation";

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  travelHotel: TravelHotelReducer,
  donate: DonateReducer,
  routing: routerReducer,
  freeConsultation: freeConsultationReducer
});

export type IApplicationState = ReturnType<typeof allReducers>;
