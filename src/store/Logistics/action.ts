import * as React from 'react'
import { typeName, StrongAction } from "../../common/StrongAction";
import { actionCreators as appActionCreators } from '../App/actions';
import { getLogistics } from '../../http/Api';
import { ILogistic } from '../../types/interfaces';

const SUFFIX = '__LOGISTICS';

@typeName('UPDATE_LIST' + SUFFIX)
export class UpdateLogisticListActions extends StrongAction { constructor(public list: ILogistic[]) { super(); }}
@typeName('UPDATE_DESTINATION' + SUFFIX)
export class UpdateDestinationAction extends StrongAction { constructor(public value: number) {super(); }}

// @todo - we could remove this action if cities/districts is returned from backend, right now
// we have to parse them and add to state treemanually
@typeName('ADD_DESTINATION' + SUFFIX)
export class AddDestination extends StrongAction { constructor(public destination: any) { super(); }}

@typeName('SEARCH_LOGISTIC' + SUFFIX)
export class SearchLogisticAction extends StrongAction { constructor(public searchText: string) { super(); }}

@typeName('RESET' + SUFFIX)
export class ResetAction extends StrongAction { constructor() { super(); }}

export interface Actions {
    fetchLogisticList(list: any[]),
    searchLogistic(searchText: string),
    updateSendPlace(value: number),
    addSendPlace(value: string)
}

export const actionCreators = {
    fetchLogisticList: (list: any[]): any => async (dispatch) => {
        dispatch(new ResetAction);
        dispatch(appActionCreators.toggleAppLoading(true));
        try {
            const promises: any[] = [];
            list.forEach((link,index) => {
                const promise = getLogistics(link).then(result => {
                    dispatch(new AddDestination({key: index, name: result[0].from}))
                    return result.map(item=>{return {...item, sendPlaceKey: index}})
                }).catch(()=>{})
                promises.push(promise)
            })

            const result = await Promise.all(promises);
            let logistics = [];
            result.forEach((l) => {
                logistics = logistics.concat(l);
            });
            dispatch(new UpdateLogisticListActions(logistics));
        } catch (error) {
            console.error(error)
        }finally{
            dispatch(appActionCreators.toggleAppLoading(false));
        }
    },
    updateSendPlace: (value: number): any => dispatch => dispatch (new UpdateDestinationAction(value)),
    addSendPlace: (value: any): any => dispatch => dispatch(new AddDestination(value)),
    searchLogistic: (searchText: string): any => dispatch => dispatch(new SearchLogisticAction(searchText)),
}