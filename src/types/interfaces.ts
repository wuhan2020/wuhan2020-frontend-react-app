export interface IClinic {
  id: number;
  province: string;
  city: string;
  district: string;
  name: string;
  supplies: IClicnicSupply[];
  url: string,
  remark: string;
  contacts: IContact[];
  cityKey?: number;
  address: string;
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

export interface IFreeConsultation {
  id: number;
  name: string;
  supplies: IFreeConsultationSupply[];
  url: string;
  remark: string;
  contacts: IContact[];
  date: string;
}

export interface IFreeConsultationSupply {
  key: string;
  value: number;
  specification?: string;
}