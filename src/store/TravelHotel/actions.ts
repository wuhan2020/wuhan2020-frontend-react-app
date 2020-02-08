import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getTravelHotels } from "../../http/Api";
import { ITravelHotel, IOption, ICity } from "src/types/interfaces";

const SUFFIX = "__TRAVEL_HOTEL";

@typeName("CHANGE_FILTER" + SUFFIX)
export class ChangeFilterAction extends StrongAction {
  constructor(public filter = {}) {
    super();
  }
}

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}

@typeName('UPDATE_TRAVEL_HOTELS' + SUFFIX)
export class UpdateTravelHotelList extends StrongAction {
  constructor(public hotels: ITravelHotel[], public provinces: any[], public cities: any[]) {
    super();
  }
}

export interface Actions {
  fetchTravelHotelList(list: any[]),
  changeFilter(filter: {
    selectedProvince?: string;
    selectedCity?: string;
    searchedText?: string;
  });
}

export const actionCreators = {
  fetchTravelHotelList: (list: any[]): any => async (dispatch) => {
    dispatch(new ResetAction())
    dispatch(appActionCreators.toggleAppLoading(true));
    try
    {
      const promises: any[] = [];
      const provinces: IOption[] = [];
      const cities: ICity[] = [];

      list.forEach((link, index) => {
        const promise = getTravelHotels(link).then((result) => {
          result.forEach((h) => {
            const provinceExisted = provinces.find((p) => p.value === h.province);
            if (!provinceExisted) {
              provinces.push({key: h.province, value: h.province});
            }
            const cityExisted = cities.find((c) => c.name === h.city);
            if (!cityExisted) {
              cities.push({key: h.city, name: h.city, parentProvince: h.province});
            }
          });
          return result;
        }).catch(() => []);;
        promises.push(promise);
      });

      const result = await Promise.all(promises);
      let hotels = [];
      result.forEach((l) => hotels = hotels.concat(l));
      dispatch (new UpdateTravelHotelList(hotels, provinces, cities));
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
  changeFilter(filter: {
    selectedProvince?: string;
    selectedCity?: string;
    searchedText?: string;
  }) {
    return dispatch => {
      dispatch(new ChangeFilterAction(filter));
    };
  }
};
