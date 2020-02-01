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
	selectedDistrict: number;
}

export const initialClinicsState: ClinicsState =
{
	list: [],
	selectedDistrict: -1,
}

export const clinicsSelector = (state: IApplicationState) => state.clinic.list;

export const clinicsSelectedDistrictSelector = (state: IApplicationState) => state.clinic.selectedDistrict;

export const makeFilteredClinicsSelector = () => {
	return createSelector(
		[clinicsSelector, clinicsSelectedDistrictSelector],
		(clinics: IClinic[], selectedDistrict: number) => {
			if (!clinics) return [];
			if (selectedDistrict === -1) return clinics;
			return clinics.filter((c) => c.districtKey === selectedDistrict);
		}
	)
}

const ClinicReducer: Reducer<ClinicsState> = (state: ClinicsState, act) =>
{
	if (isActionType(act, Actions.UpdateClinicListActions)) {
		return {...state, list: state.list.concat(act.list)};
	} else if (isActionType(act, Actions.UpdateDistrict)) {
		return {...state, selectedDistrict: act.value};
	}
	return state || initialClinicsState
}

export default ClinicReducer;