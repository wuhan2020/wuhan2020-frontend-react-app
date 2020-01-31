import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";

const SUFFIX = '__APP';

@typeName('LOADING' + SUFFIX)
export class ToggleAppLoadingAction extends StrongAction {constructor(public loading: boolean) { super(); }
}

export interface Actions
{
  toggleAppLoading(loading: boolean);
}


export const actionCreators = {
  toggleAppLoading: (loading: boolean): any => dispatch => {
    dispatch(new ToggleAppLoadingAction(loading));
  }
};