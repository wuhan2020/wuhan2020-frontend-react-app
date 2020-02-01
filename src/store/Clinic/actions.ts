import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getClinics } from '../../http/Api';
import { IClinic } from '../../types/interfaces';
import { mockClinics } from '../../mockData/Clinics';

const SUFFIX = '__CLINICS';

@typeName('UPDATE_LIST' + SUFFIX)
export class UpdateClinicListActions extends StrongAction { constructor(public list: IClinic[]) { super(); }}

@typeName('UPDATE_DISTRICT' + SUFFIX)
export class UpdateDistrict extends StrongAction { constructor(public value: number) {super(); }}

export interface Actions
{
  fetchClinicList(provinceName: string, districtName: string, index: number);
  updateDistrict(value: number);
}


export const actionCreators = {
  fetchClinicList: (provinceName: string, districtName: string, index: number): any => async (dispatch) => {
    dispatch(appActionCreators.toggleAppLoading(true));
    try
    {
      const result = await getClinics(provinceName, districtName);
      const list = result.map((item) => {return {...item, districtKey: index}});
      dispatch(new UpdateClinicListActions(list));
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
  updateDistrict: (value: number): any => dispatch => dispatch (new UpdateDistrict(value)),
};