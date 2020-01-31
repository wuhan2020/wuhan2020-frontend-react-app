import { Reducer } from "redux";
import * as React from 'react'
import { isActionType } from "../../common/StrongAction";
import { ILocales } from "../../intl";
import * as Actions from './actions';


export interface AppState
{
	locale: ILocales;
	loading: boolean;
}

export const initialAppState: AppState =
{
	locale: "zh-CN",
	loading: false,
}

const AppReducer: Reducer<AppState> = (state: AppState, act) =>
{
	console.log('Dispatched action: ' + act.type);
	if (isActionType(act, Actions.ToggleAppLoadingAction)) {
		return {...state, loading: act.loading};
	}
	return state || initialAppState
}

export default AppReducer;