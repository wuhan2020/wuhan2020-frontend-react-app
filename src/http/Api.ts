import { IClinic } from "../types/interfaces";
import HttpManager from "./HttpManager";
import { hospitalRootUrl } from "../constants/globals";

export const getClinics = (provinceName: string, districtName: string): Promise<IClinic[]> => {
  const url = `${hospitalRootUrl}/${provinceName}/${districtName}.json`;

  return HttpManager.getInstance().get(url);
}