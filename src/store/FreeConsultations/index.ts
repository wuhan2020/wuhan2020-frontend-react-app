import { Reducer } from "redux";
import * as React from 'react';
import { isActionType } from "../../common/StrongAction";
import * as Actions from './actions';
import { IFreeConsultation } from "../../types/interfaces";
import { createSelector } from "reselect";
import { IApplicationState } from "..";

export interface freeConsultationState
{
    pageNum?: number;
    name: string;
    url: string;
    id: number;
    list: IFreeConsultation[];
    searchText: string;
}

export const initialFreeConsultationStateState: freeConsultationState =
{
    pageNum: 1,
    name: "test",
    url: 'test',
    id: 1,
    list: [],
    searchText: '',
}

export const consultationsSelector = (state: IApplicationState) => state.freeConsultation.list;
export const consultationSearchSelector = (state: IApplicationState) => state.freeConsultation.searchText;

export const makeFilteredConsultationsSelector = () => {
	return createSelector(
		[consultationsSelector, consultationSearchSelector],
		(consultations: IFreeConsultation[], searchText: string) => {
            if (!consultations) return [];
			return consultations.filter(c => c.name.includes(searchText));
		}
	);
};
const FreeConsultationReducer: Reducer<freeConsultationState> = (state: freeConsultationState, act) =>
{
	if (isActionType(act, Actions.UpdateFreeConsultationActions)) {
		return {...state, list: act.list};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialFreeConsultationStateState};
	} else if (isActionType(act, Actions.SearchConsultation)) {
        return {...state, searchText: act.searchText};
    }
	return state || initialFreeConsultationStateState
}

export default FreeConsultationReducer;