import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AppReducer from './App';
import ClinicReducer from './Clinic';
import TravelHotelReducer from './TravelHotel';

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  travelHotel: TravelHotelReducer,
  routing: routerReducer
})

export type IApplicationState = ReturnType<typeof allReducers>
