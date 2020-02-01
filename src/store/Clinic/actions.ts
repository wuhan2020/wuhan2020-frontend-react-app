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


export interface Actions
{
  fetchClinicList(link: string, index: number);
  updateCity(value: number);
  addCity(city: any);
}


export const actionCreators = {
  fetchClinicList: (link: string, index: number): any => async (dispatch) => {
    dispatch(appActionCreators.toggleAppLoading(true));
    try
    {
      const result = await getClinics(link) as any;
      if (result.length > 0) {
        const list = result.map((item) => {return {...item, cityKey: index}});
        dispatch(new AddCityAction({key: index, name: result[0].city}));
        dispatch(new UpdateClinicListActions(list));
        // dispatch(new UpdateClinicListActions(mockClinics));
      }
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