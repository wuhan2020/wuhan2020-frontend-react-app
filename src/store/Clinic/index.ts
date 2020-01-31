import { Reducer } from "redux";
import * as React from 'react'
import { isActionType } from "../../common/StrongAction";
import { IClinic } from "../../types/interfaces";
import * as Actions from './actions';


export interface ClinicsState
{
	list: IClinic[];
}

export const initialClinicsState: ClinicsState =
{
  list: [],
}

const ClinicReducer: Reducer<ClinicsState> = (state: ClinicsState, act) =>
{
	if (isActionType(act, Actions.UpdateClinicListActions)) {
		return {...state, list: state.list.concat(act.list)};
	}
	return state || initialClinicsState
}

export default ClinicReducer;