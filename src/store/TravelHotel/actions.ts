import { typeName, StrongAction } from "../../common/StrongAction";

const SUFFIX = "__HOTEL";

@typeName("CHANGE_FILTER" + SUFFIX)
export class ChangeFilterAction extends StrongAction {
  constructor(public filter = {}) {
    super();
  }
}

@typeName("FETCH_HOTELS" + SUFFIX)
export class FetchHotelsAction extends StrongAction {
  constructor(public filter = {}) {
    super();
  }
}
@typeName("FETCH_PROVINCES" + SUFFIX)
export class FetchProvincesAction extends StrongAction {
  constructor() {
    super();
  }
}
@typeName("FETCH_CITIES" + SUFFIX)
export class FetchCitiesAction extends StrongAction {
  constructor(public province = "") {
    super();
  }
}

export interface Actions {
  fetchProvinces();
  fetchCities(province: string);
  fetchHotels();
  changeFilter(filter: {
    selectedProvince?: string;
    selectedCity?: string;
    searchedText?: string;
  });
}

export const actionCreators = {
  fetchProvinces() {
    return dispatch => {
      dispatch(new FetchProvincesAction());
    };
  },
  fetchCities(province) {
    return dispatch => {
      dispatch(new FetchCitiesAction(province));
    };
  },
  fetchHotels() {
    return dispatch => {
      dispatch(new FetchHotelsAction());
    };
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
