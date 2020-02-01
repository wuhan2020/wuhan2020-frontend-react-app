import { Reducer } from "redux";
import * as React from 'react'
import { isActionType } from "../../common/StrongAction";
import { IClinic } from "../../types/interfaces";
import * as Actions from './actions';
import { createSelector } from "reselect";
import { IApplicationState } from "..";


export interface ClinicsState
{
	list: IClinic[];
	selectedCity: number;
	cityList: {key: number, name: string}[];
}

export const initialClinicsState: ClinicsState =
{
	list: [],
	selectedCity: -1,
	cityList: [{key: -1, name: '省市'}],
}

export const clinicsSelector = (state: IApplicationState) => state.clinic.list;

export const clinicsSelectedCitySelector = (state: IApplicationState) => state.clinic.selectedCity;

export const makeFilteredClinicsSelector = () => {
	return createSelector(
		[clinicsSelector, clinicsSelectedCitySelector],
		(clinics: IClinic[], selectedCity: number) => {
			if (!clinics) return [];
			if (selectedCity === -1) return clinics;
			return clinics.filter((c) => c.cityKey === selectedCity);
		}
	)
}

const ClinicReducer: Reducer<ClinicsState> = (state: ClinicsState, act) =>
{
	if (isActionType(act, Actions.UpdateClinicListActions)) {
		return {...state, list: state.list.concat(act.list)};
	} else if (isActionType(act, Actions.UpdateCityAction)) {
		return {...state, selectedCity: act.value};
	} else if (isActionType(act, Actions.AddCityAction)) {
		return {...state, cityList: [...state.cityList, act.city]};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialClinicsState};
	}
	return state || initialClinicsState
}

export default ClinicReducer;