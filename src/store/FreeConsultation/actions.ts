import { typeName, StrongAction } from "src/common/StrongAction";

const SUFFIX = "__FREE_CONSULTATION";

@typeName("SEARCH_CLINIC" + SUFFIX)
export class SearchClinicAction extends StrongAction {
  constructor(public searchText: string) {
    super();
  }
}

export interface Actions {

}


export const actionCreators = {

}

