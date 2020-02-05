import { Reducer } from "redux";
import * as React from 'react'
import { isActionType } from "../../common/StrongAction";
import { ILocales } from "../../intl";
import * as Actions from './actions';

export interface IDataSource {
	[key: string]: string[];
}

export interface freeConsulationState
{
    pageNum?: number;
    name: string;
    url: string;
    id: number;
}

export const initialFreeConsulationStateState: freeConsulationState =
{
    pageNum: 1,
    name: "test",
    url: 'test',
    id: 1
}

const FreeConsultationReducer: Reducer<freeConsulationState> = (state: freeConsulationState, act) =>
{
	console.log('Dispatched action: ' + act.type);
	if (isActionType(act, Actions.GetFreeConsultationActions)) {
		return {...state, loading: act};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialFreeConsulationStateState};
	}
	return state || initialFreeConsulationStateState
}

export default FreeConsultationReducer;