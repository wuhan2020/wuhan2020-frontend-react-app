import { IClinic } from "../types/interfaces";
import HttpManager from "./HttpManager";

export const getClinics = (districtName: string): Promise<IClinic[]> => {
  const url = `/医院/${districtName}.json`;

  return HttpManager.getInstance().get(url);
}