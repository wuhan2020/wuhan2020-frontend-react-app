import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AppReducer from './App';
import ClinicReducer from './Clinic';
import DonateReducer from './Donate';
import LogisticReducer from './Logistics';
import freeConsultationReducer from './FreeConsultations';

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  routing: routerReducer,
  freeConsultation: freeConsultationReducer,
  donate: DonateReducer,
  logistics: LogisticReducer,
});

export type IApplicationState = ReturnType<typeof allReducers>;
