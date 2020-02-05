import { IClinic, IDonate, ILogistic } from "../types/interfaces";
import HttpManager from "./HttpManager";
import { IDataSource } from "../store/App";
import { FRONT_END_PREFIX } from "../constants/globals";

export const getClinics = (link: string): Promise<IClinic[]> => {
  const url = `${FRONT_END_PREFIX}/${link}`;

  return HttpManager.getInstance().get(url);
};

export const getDonate = (link: string): Promise<IDonate[]> => {
  const url = `${FRONT_END_PREFIX}/${link}`;
  return HttpManager.getInstance().get(url);
};

export const getFreeConsultation = (link: string): Promise <any> => {
  const url = `${FRONT_END_PREFIX}/${link}`;

  return HttpManager.getInstance().get(url);
}

export const getDataSources = (): Promise<IDataSource> => {
  const url = `index.json`;

  return HttpManager.getInstance().get(url);
}

export const getLogistics = (link: string): Promise<ILogistic[]> => {
  const url = `${FRONT_END_PREFIX}/${link}`;

  return HttpManager.getInstance().get(url);
}
