import { Reducer } from "redux";
import { isActionType } from "../../common/StrongAction";
import * as Actions from './actions';

export interface LiveMapState
{
  data?: any;
}

export const initialLiveMapStateState: LiveMapState =
{
}

const LiveMapReducer: Reducer<LiveMapState> = (state: LiveMapState, act) =>
{
	if (isActionType(act, Actions.UpdateDataAction)) {
		return {...state, data: act.data};
	} else if (isActionType(act, Actions.ResetAction)) {
		return {...initialLiveMapStateState};
	}
	return state || initialLiveMapStateState
}

export default LiveMapReducer;