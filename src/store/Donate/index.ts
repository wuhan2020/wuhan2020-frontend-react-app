import { Reducer } from "redux";
import { isActionType } from "../../common/StrongAction";
import { IDonate } from "../../types/interfaces";
import * as Actions from './actions';
import { createSelector } from "reselect";
import { IApplicationState } from "..";

export interface DonateState {
  list: IDonate[];
  selectedCity: number;
  cityList: {
    key: number,
    name: string
  }[];
}

export const initialDonateState: DonateState = {
  list: [],
  selectedCity: -1,
  cityList: [{key: -1, name: '省市'}],
};

export const donatesSelector = (state: IApplicationState) => state.donate.list;

export const donatesSelectedCitySelector = (state: IApplicationState) => state.donate.selectedCity;

export const makeFilteredDonatesSelector = () => {
  return createSelector(
    [donatesSelector, donatesSelectedCitySelector],
    (donates: IDonate[], selectedCity: number) => {
      if (!donates) return [];
      return donates;
    }
  )
};

const DonateReducer: Reducer<DonateState> = (state: DonateState, act) => {
  if (isActionType(act, Actions.UpdateDonateListActions)) {
    return {...state, list: state.list.concat(act.list)};
  } else if (isActionType(act, Actions.UpdateCityAction)) {
    return {...state, selectedCity: act.value};
  } else if (isActionType(act, Actions.AddCityAction)) {
    return {...state, cityList: [...state.cityList, act.city]};
  } else if (isActionType(act, Actions.ResetAction)) {
    return {...initialDonateState};
  }
  return state || initialDonateState;
};

export default DonateReducer;