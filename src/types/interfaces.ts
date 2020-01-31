export interface IClinic {
  province: string;
  city: string;
  name: string;
  supplies: IClicnicSupply[];
  contacts: IContact[];
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