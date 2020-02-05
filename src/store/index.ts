import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import AppReducer from "./App";
import ClinicReducer from "./Clinic";
import freeConsultationReducer from "./freeConsultation";
import DonateReducer from "./Donate";

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  routing: routerReducer,
  freeConsultation: freeConsultationReducer,
  donate: DonateReducer
});

export type IApplicationState = ReturnType<typeof allReducers>;
