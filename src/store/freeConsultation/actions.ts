import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getFreeConsultation } from '../../http/Api';
import { IFreeConsultation } from '../../types/interfaces';

const SUFFIX = '__CLINICS';

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}

@typeName('GET_FREE_CONSULTATION' + SUFFIX)
export class GetFreeConsultationActions extends StrongAction { constructor(public list: IFreeConsultation[]) {super(); }}

export interface Actions
{
  fetchFreeConsultationList(list: any[]);
}


export const actionCreators = {
  fetchFreeConsultationList: (list: any[]): any => async (dispatch) => {
    dispatch(new ResetAction());
    dispatch(appActionCreators.toggleAppLoading(true));
    try
    {
      const promises: any[] = [];
      list.forEach((link, index) => {
        const promise = getFreeConsultation(link).then((result) => {
          return result;
        }).catch(() => []);;
        promises.push(promise);
      });

      const result = await Promise.all(promises);
      let freeCinsultation = [];
      result.forEach((l) => freeCinsultation = freeCinsultation.concat(l));
      dispatch(new GetFreeConsultationActions(freeCinsultation));
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