import { Reducer } from "redux";
import * as React from 'react'
import { isActionType } from "../../common/StrongAction";
import { ILogistic } from "../../types/interfaces";
import * as Actions from './action';
import { createSelector } from "reselect";
import { IApplicationState } from "..";

export interface LogisticsState
{
	list: ILogistic[];
	selectedSendPlace: number;
    searchText: string,
	sendPlaceList: {value: number, description: string}[];
}

export const initialLogisticsState: LogisticsState =
{
	list: [],
	selectedSendPlace: -1,
    searchText: '',
	sendPlaceList: [{value: -1, description: '全部'}, {value: 0, description: "中国大陆"}, {value: 1, description: "港澳台"}, {value: 2, description: "海外"}],
}

export const logisticsSelector = (state: IApplicationState) => state.logistics.list;

export const logtisticSelectedSendPlaceSelector = (state: IApplicationState) => state.logistics.selectedSendPlace;

export const logisticsSearchSelector = (state: IApplicationState) => state.logistics.searchText;

export const makeFilteredLogisticsSelector = () => {
	return createSelector(
		[logisticsSelector, logtisticSelectedSendPlaceSelector, logisticsSearchSelector],
		(logistics: ILogistic[], selectedSendPlace: number, searchText: string) => {
			if (!logistics) return [];
			return logistics.filter((c) => {
				const matchFrom = selectedSendPlace === -1 || c.sendPlaceKey === selectedSendPlace;
				const matchSearchText = !searchText || c.name.includes(searchText);
				return matchFrom && matchSearchText;
      });
		}
	)
}

const LogisticReducer: Reducer<LogisticsState> = (state: LogisticsState, act) =>
{
	if (isActionType(act, Actions.UpdateLogisticListActions)) {
		return {...state, list: state.list.concat(act.list)};
	} else if (isActionType(act, Actions.UpdateDestinationAction)) {
		return {...state, selectedSendPlace: act.value};
	} else if (isActionType(act, Actions.AddDestination)) {
		return {...state, sendPlaceList: [...state.sendPlaceList, act.destination]};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialLogisticsState};
	} else if (isActionType(act, Actions.SearchLogisticAction)) {
    return {...state, searchText: act.searchText};
  }
	return state || initialLogisticsState
}

export default LogisticReducer;