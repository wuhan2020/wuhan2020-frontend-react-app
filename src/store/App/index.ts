import { Reducer } from "redux";
import * as React from 'react'
import { isActionType } from "../../common/StrongAction";
import { ILocales } from "../../intl";


export interface AppState
{
	locale: ILocales;
}

export const initialAppState: AppState =
{
	locale: "zh-CN",
}

const AppReducer: Reducer<AppState> = (state, act) =>
{
	console.log('Dispatched action: ' + act.type);
	const newState = { ...state };
	return state || initialAppState
}

export default AppReducer;