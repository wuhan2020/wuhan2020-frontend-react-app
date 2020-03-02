export interface IClinic {
  id: number;
  province: string;
  city: string;
  district: string;
  name: string;
  supplies: IClicnicSupply[];
  url: string;
  remark: string;
  contacts: IContact[];
  cityKey?: number;
  address: string;
}
export interface ILogistic {
  id: number;
  name: string;
  from: string;
  dest: string;
  contacts: ILogisticContact[];
  date: string;
  allowPersonal: string;
  url: string;
  remark: string;
  area: string;
  telRemark: string;
  website: string;
  orderUrl: string;
  customService: string;
  noticeTitle: string;
  noticeContent: string;
  greenPath: string;
  sendPlaceKey?: number;
}

export interface ILogisticContact {
  name: string;
  tel: string;
}

export interface IClicnicSupply {
  key: string;
  value: number;
  specification?: string;
}

export interface IContact {
  name?: string;
  tel?: string;
}

export interface IFreeConsultation {
  name: string;
  url: string;
  id: number;
  contacts: Array<{ [key: string]: string }>;
  date: string;
  remark: string;
}
export interface ITravelHotel {
  id: number;
  province: string;
  city: string;
  contacts: IContact[];
  address: string;
  name: string;
  date: string;
  url: string;
  remark: string;
}

export interface IOption {
  key: string;
  value: string;
}

export interface ICity {
  key: string;
  name: string;
  // @todo - when backend supports, use id for parentProvince (number type)
  parentProvince: string;
}

export interface IDonate {
  id: number;
  name: string;
  contacts: IContact[];
  address: any;
  email: string;
  wechat: string;
  bankAccounts: IDonateBankAccount[];
  rfb: any;
  remark: string;
  date: string;
  url: string;
  status: string;
}

export interface IDonateBankAccount {
  name: string;
  bank: string;
  number: string;
}

export interface IFreeConsultation {
  name: string;
  url: string;
  id: number;
  contacts: Array<{ [key: string]: string }>;
  date: string;
  remark: string;
}
