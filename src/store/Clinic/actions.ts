import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getClinics } from '../../http/Api';
import { IClinic } from '../../types/interfaces';

const SUFFIX = '__CLINICS';

@typeName('UPDATE_LIST' + SUFFIX)
export class UpdateClinicListActions extends StrongAction { constructor(public list: IClinic[]) { super(); }}

export interface Actions
{
  fetchClinicList(districtName: string, index: number);
}


export const actionCreators = {
  fetchClinicList: (districtName: string, index: number): any => async (dispatch) => {
    dispatch(appActionCreators.toggleAppLoading(true));
    try
    {
      const result = await getClinics(districtName);
      const list = result.map((item) => {return {...item, category: index}});
      dispatch(new UpdateClinicListActions(list));
    }
    catch (err)
    {
      console.error(err);
    }
    finally
    {
      dispatch(appActionCreators.toggleAppLoading(false));
    }
  }
};