import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AppReducer from './App';
import ClinicReducer from './Clinic';

export const allReducers = combineReducers({
  app: AppReducer,
  clinic: ClinicReducer,
  routing: routerReducer
})

export type IApplicationState = ReturnType<typeof allReducers>
