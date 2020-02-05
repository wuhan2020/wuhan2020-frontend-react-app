import { Reducer } from "redux";
import * as React from 'react';
import { isActionType } from "../../common/StrongAction";
import * as Actions from './actions';
import { IFreeConsultation } from "../../types/interfaces";

export interface freeConsulationState
{
    pageNum?: number;
    name: string;
    url: string;
    id: number;
    list: IFreeConsultation[];
}

export const initialFreeConsulationStateState: freeConsulationState =
{
    pageNum: 1,
    name: "test",
    url: 'test',
    id: 1,
    list: [],
}

const FreeConsultationReducer: Reducer<freeConsulationState> = (state: freeConsulationState, act) =>
{
	console.log('Dispatched action: ' + act.type);
	if (isActionType(act, Actions.UpdateFreeConsultationActions)) {
		return {...state, list: act.list};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialFreeConsulationStateState};
	}
	return state || initialFreeConsulationStateState
}

export default FreeConsultationReducer;