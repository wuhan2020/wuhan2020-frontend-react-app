import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AppReducer from './App';
import ClinicReducer from './Clinic';
import DonateReducer from './Donate';

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  donate: DonateReducer,
  routing: routerReducer
});

export type IApplicationState = ReturnType<typeof allReducers>
