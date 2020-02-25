import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getFreeConsultation } from '../../http/Api';
import { IFreeConsultation } from '../../types/interfaces';

const SUFFIX = '__CLINICS';

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}

@typeName('UPDATE_FREE_CONSULTATION' + SUFFIX)
export class UpdateFreeConsultationActions extends StrongAction { constructor(public list: IFreeConsultation[]) {super(); }}

@typeName('SEARCH_CONSULTATION' + SUFFIX)
export class SearchConsultation extends StrongAction { constructor(public searchText: string) { super(); }}

export interface Actions
{
  fetchFreeConsultationList(list: any[]);
  searchConsultation(searchText: string);
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
      let freeConsultation = [];
      result.forEach((l) => freeConsultation = freeConsultation.concat(l));
      dispatch(new UpdateFreeConsultationActions(freeConsultation));
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
  searchConsultation: (searchText: string): any => dispatch => dispatch(new SearchConsultation(searchText)),
};