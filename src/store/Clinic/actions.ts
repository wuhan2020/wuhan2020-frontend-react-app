import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getClinics } from '../../http/Api';
import { IClinic } from '../../types/interfaces';

const SUFFIX = '__CLINICS';

@typeName('UPDATE_LIST' + SUFFIX)
export class UpdateClinicListActions extends StrongAction { constructor(public list: IClinic[]) { super(); }}

@typeName('UPDATE_CITY' + SUFFIX)
export class UpdateCityAction extends StrongAction { constructor(public value: number) {super(); }}

// @todo - we could remove this action if cities/districts is returned from backend, right now
// we have to parse them and add to state treemanually
@typeName('ADD_CITY' + SUFFIX)
export class AddCityAction extends StrongAction { constructor(public city: any) { super(); }}

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}


export interface Actions
{
  fetchClinicList(list: any[]);
  updateCity(value: number);
  addCity(city: any);
}


export const actionCreators = {
  fetchClinicList: (list: any[]): any => async (dispatch) => {
    dispatch(new ResetAction());
    dispatch(appActionCreators.toggleAppLoading(true));
    try
    {
      const promises: any[] = [];
      list.forEach((link, index) => {
        const promise = getClinics(link).then((result) => {
          dispatch(new AddCityAction({key: index, name: result[0].city}));
          return result.map((item) => {return {...item, cityKey: index};});
        }).catch(() => []);;
        promises.push(promise);
      });

      const result = await Promise.all(promises);
      let clinics = [];
      result.forEach((l) => clinics = clinics.concat(l));
      dispatch(new UpdateClinicListActions(clinics));
      // dispatch(new UpdateClinicListActions(mockClinics));
    }
    catch (err)
    {
      console.error(err);
    }
    finally
    {
      dispatch(appActionCreators.toggleAppLoading(false));
    }
  },
  updateCity: (value: number): any => dispatch => dispatch (new UpdateCityAction(value)),
  addCity: (city: any): any => dispatch => dispatch(new AddCityAction(city)),
};