import { StrongAction, typeName } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getDonate } from '../../http/Api';
import { IDonate } from '../../types/interfaces';

const SUFFIX = '__DONATE';

@typeName('UPDATE_LIST' + SUFFIX)
export class UpdateDonateListActions extends StrongAction { constructor(public list: IDonate[]) { super(); }}

@typeName('UPDATE_CITY' + SUFFIX)
export class UpdateCityAction extends StrongAction { constructor(public value: number) {super(); }}

@typeName('ADD_CITY' + SUFFIX)
export class AddCityAction extends StrongAction { constructor(public city: any) { super(); }}

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}

export interface Actions {
  fetchDonateList(list: any[]);
  updateCity(value: number);
  addCity(city: any);
}

export const actionCreators = {
  fetchDonateList: (list: any[]): any => async (dispatch) => {
    dispatch(new ResetAction());
    dispatch(appActionCreators.toggleAppLoading(true));
    try {
      const promises: any[] = [];
      list.forEach((link, index) => {
        const promise = getDonate(link);
        promises.push(promise);
      });

      const result = await Promise.all(promises);
      let donates = [];
      result.forEach((l) => donates = donates.concat(l));
      dispatch(new UpdateDonateListActions(donates));
    }
    catch (err) {
      console.error(err);
    }
    finally {
      dispatch(appActionCreators.toggleAppLoading(false));
    }
  },
  updateCity: (value: number): any => dispatch => dispatch (new UpdateCityAction(value)),
  addCity: (city: any): any => dispatch => dispatch(new AddCityAction(city)),
};