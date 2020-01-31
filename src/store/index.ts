import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import AppReducer, { AppState } from './App';

export const allReducers = combineReducers({
  app: AppReducer,
  routing: routerReducer
})

export type IApplicationState = ReturnType<typeof allReducers>
