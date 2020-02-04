import { Reducer } from "redux";
import * as React from "react";
import { isActionType } from "../../common/StrongAction";
import { IClinic } from "../../types/interfaces";
// import * as Actions from "./actions";
import { createSelector } from "reselect";
import { IApplicationState } from "..";

export interface ClinicsState {
  list: IClinic[];
  selectedCity: number;
  searchText: string;
  cityList: { key: number; name: string }[];
}

export const initialClinicsState: ClinicsState = {
  list: [],
  selectedCity: -1,
  searchText: "",
  cityList: [{ key: -1, name: "省市" }]
};

export const clinicsSelector = (state: IApplicationState) => state.clinic.list;

export const clinicsSelectedCitySelector = (state: IApplicationState) =>
  state.clinic.selectedCity;

export const clinicsSearchSelector = (state: IApplicationState) =>
  state.clinic.searchText;


export const makeFilteredClinicsSelector = () => {
  return createSelector(
    [clinicsSelector, clinicsSelectedCitySelector, clinicsSearchSelector],
    (clinics: IClinic[], selectedCity: number, searchText: string) => {
      if (!clinics) return [];
      return clinics.filter(c => {
        const matchCity = selectedCity === -1 || c.cityKey === selectedCity;
        const matchSearchText = !searchText || c.name.includes(searchText);
        return matchCity && matchSearchText;
      });
    }
  );
};

