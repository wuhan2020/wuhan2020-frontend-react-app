import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AppReducer from './App';
import ClinicReducer from './Clinic';
import DonateReducer from './Donate';
import LogisticReducer from './Logistics';
import freeConsultationReducer from './freeConsultation';
import TravelHotelReducer from './TravelHotel';

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  travelHotel: TravelHotelReducer,
  donate: DonateReducer,
  routing: routerReducer,
  freeConsultation: freeConsultationReducer,
  logistics: LogisticReducer,
});

export type IApplicationState = ReturnType<typeof allReducers>;
