import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getMapData } from '../../http/Api';

const SUFFIX = '__LIVE_MAP';

@typeName('UPDATE_DATA' + SUFFIX)
export class UpdateDataAction extends StrongAction { constructor(public data: any) { super(); }}

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}

export interface Actions {
  fetchData();
}

export const actionCreators = {
    fetchData: (): any => async (dispatch) => {
      dispatch(new ResetAction());
      dispatch(appActionCreators.toggleAppLoading(true));
      try {
        const promises: any[] = [getMapData('current'), getMapData('overall'), getMapData('history')];
        const result = await Promise.all(promises);
        dispatch(new UpdateDataAction({
          current: result[0].results,
          overall: result[1].results,
          history: result[2].results,
        }));
      } catch (error) {
          console.error(error)
      }finally{
          dispatch(appActionCreators.toggleAppLoading(false));
      }
    },
}