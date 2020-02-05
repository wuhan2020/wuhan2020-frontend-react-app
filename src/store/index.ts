import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AppReducer from './App';
import ClinicReducer from './Clinic';
import DonateReducer from './Donate';
import LogisticReducer from './Logistics';
import freeConsultationReducer from './freeConsultation';
import LiveMapReducer from './LiveMap';

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  donate: DonateReducer,
  routing: routerReducer,
  logistics: LogisticReducer,
  liveMap: LiveMapReducer,
  freeConsultation: freeConsultationReducer
});

export type IApplicationState = ReturnType<typeof allReducers>
