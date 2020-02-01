import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { getDataSources } from '../../http/Api';
import { IDataSource } from '.';

const SUFFIX = '__APP';

@typeName('LOADING' + SUFFIX)
export class ToggleAppLoadingAction extends StrongAction {constructor(public loading: boolean) { super(); }
}

@typeName('UPDATE_DATA_SOURCES' + SUFFIX)
export class UpdateDataSourcesAction extends StrongAction { constructor(public source: IDataSource) { super(); }}

export interface Actions
{
  toggleAppLoading(loading: boolean);
  fetchAllDataSource();
}


export const actionCreators = {
  toggleAppLoading: (loading: boolean): any => dispatch => {
    dispatch(new ToggleAppLoadingAction(loading));
  },
  fetchAllDataSource: (): any => async (dispatch) => {
    try
    {
      const result = await getDataSources() as IDataSource;
      dispatch(new UpdateDataSourcesAction(result));
    }
    catch (err)
    {
      console.error(err);
    }
    finally
    {
    }
  }
};