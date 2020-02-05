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
  name?: string;
  tel?: string;
}

export interface IContacts {
  name: string;
  tel: string;
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
  contacts: Array<{[key: string]: string}>,
  date: string,
  remark: string
}