/*
 * @Description: 
 * @Author: huangdeliang
 * @Date: 2020-03-04 08:28:13
 * @LastEditors: huangdeliang
 */
import { Reducer } from 'redux';
import * as React from 'react';
import { isActionType } from '../../common/StrongAction';
import { ILogistic } from '../../types/interfaces';
import * as Actions from './action';
import { createSelector } from 'reselect';
import { IApplicationState } from '..';
import { isMobile } from '../../utils/deviceHelper';

export interface LogisticsState {
  list: ILogistic[];
  pageSize: number;
  currentPage: number;
  selectedSendPlace: number;
  selectedChannel: number;
  searchText: string;
  sendPlaceList: { value: number; description: string }[];
  channelList: { value: number; description: string }[];
}

export const initialLogisticsState: LogisticsState = {
  list: [],
  pageSize: 6,
  currentPage: 1,
  selectedSendPlace: -1,
  selectedChannel: -1,
  searchText: '',
  sendPlaceList: [
    { value: -1, description: '全部' },
    { value: 0, description: '中国大陆' },
    // { value: 1, description: '港澳台' },
    // { value: 2, description: '海外' },
  ],
  channelList: [
    { value: -1, description: '全部' },
    { value: 0, description: '绿色通道' },
  ],
};

export const logisticsSelector = (state: IApplicationState) => state.logistics.list;

export const logtisticSelectedSendPlaceSelector = (state: IApplicationState) =>
  state.logistics.selectedSendPlace;

export const logisticsSearchSelector = (state: IApplicationState) => state.logistics.searchText;

export const logisticsSelectedChannelSelector = (state: IApplicationState) =>
  state.logistics.selectedChannel;

export const logisticsPageSelector = (state: IApplicationState) => ({
  currentPage: state.logistics.currentPage,
  pageSize: state.logistics.pageSize,
});

export const makeFilteredLogisticsSelector = () => {
  return createSelector(
    [
      logisticsSelector,
      logtisticSelectedSendPlaceSelector,
      logisticsSearchSelector,
      logisticsSelectedChannelSelector,
      logisticsPageSelector,
    ],
    (logistics, selectedSendPlace, searchText, selectedChannel, { currentPage, pageSize }) => {
      if (!logistics) return [];
      const filteredListed = logistics.filter(c => {
        const matchFrom = selectedSendPlace === -1 || c.sendPlaceKey === selectedSendPlace;
        const matchSearchText = !searchText || c.name.includes(searchText);
        const matchChannel = selectedChannel === -1 || c.greenPath === '是';
        return matchFrom && matchSearchText && matchChannel;
      });
      return isMobile
        ? filteredListed
        : filteredListed.slice(0 + (currentPage - 1) * pageSize, currentPage * pageSize);
    }
  );
};

const LogisticReducer: Reducer<LogisticsState> = (state: LogisticsState, act) => {
  if (isActionType(act, Actions.UpdateLogisticListActions)) {
    return { ...state, list: state.list.concat(act.list) };
  } else if (isActionType(act, Actions.UpdateDestinationAction)) {
    return { ...state, selectedSendPlace: act.value };
  } else if (isActionType(act, Actions.AddDestination)) {
    return { ...state, sendPlaceList: [...state.sendPlaceList, act.destination] };
  } else if (isActionType(act, Actions.ResetAction)) {
    return { ...initialLogisticsState };
  } else if (isActionType(act, Actions.SearchLogisticAction)) {
    return { ...state, searchText: act.searchText };
  } else if (isActionType(act, Actions.UpdateCurrentPage)) {
    return { ...state, currentPage: act.page };
  } else if (isActionType(act, Actions.UpdateChannel)) {
    return { ...state, selectedChannel: act.value };
  }
  return state || initialLogisticsState;
};

export default LogisticReducer;
