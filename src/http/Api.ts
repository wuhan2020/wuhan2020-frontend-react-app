import { IClinic } from "../types/interfaces";
import HttpManager from "./HttpManager";
import { IDataSource } from "../store/App";
import { FRONT_END_PREFIX } from "../constants/globals";

export const getClinics = (link: string): Promise<IClinic[]> => {
  const url = `${FRONT_END_PREFIX}/${link}`;

  return HttpManager.getInstance().get(url);
}

export const getDataSources = (): Promise<IDataSource> => {
  const url = `index.json`;

  return HttpManager.getInstance().get(url);
}
