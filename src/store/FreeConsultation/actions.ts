import { typeName, StrongAction } from "../../common/StrongAction";
import { ResetAction, AddCityAction } from "../Clinic/actions";
import { actionCreators as appActionCreators } from "../App/actions";
import { getFreeConsultation } from "../../http/Api";
import { IFreeConsultation } from "src/types/interfaces";


const SUFFIX = "__FREE_CONSULTATION";

@typeName("SEARCH_FREE_CONSULTATION" + SUFFIX)
export class SearchClinicAction extends StrongAction {
  constructor(public searchText: string) {
    super();
  }
}

@typeName("UPDATE_LIST" + SUFFIX)
export class UpdateClinicListActions extends StrongAction {
  constructor(public list: IFreeConsultation[]) {
    super();
  }
}


export interface Actions {
  fetchFreeConsultationList(list: any[]);
}


export const actionCreators = {
         fetchFreeConsultationList: (list: any[]): any => async dispatch => {
           dispatch(new ResetAction());
           dispatch(appActionCreators.toggleAppLoading(true));
           try {
             const promises: any[] = [];
             list.forEach((link, index) => {
               const promise = getFreeConsultation(link)
                 .then(result => {
                      return result.map(item => {
                        console.log("lalalal", item);
                        return { ...item, cityKey: index };
                      });
                 })
                 .catch(() => []);
               promises.push(promise);
             });

             const result = await Promise.all(promises);
              let clinics = [];
              result.forEach(l => (clinics = clinics.concat(l)));
              console.log(result);
              dispatch(new UpdateClinicListActions(clinics));
           } catch (err) {
             console.error(err);
           } finally {
             dispatch(appActionCreators.toggleAppLoading(false));
           }
         }
       };

