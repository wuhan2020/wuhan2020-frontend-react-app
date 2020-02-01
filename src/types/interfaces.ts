export interface IClinic {
  province: string;
  city: string;
  district: string;
  name: string;
  supplies: IClicnicSupply[];
  url: string,
  remark: boolean;
  contacts: IContact[];
  districtKey?: number;
}

export interface IClicnicSupply {
  key: string;
  value: number;
  specification?: string;
}

export interface IContact {
  name: string;
  tel: string;
}