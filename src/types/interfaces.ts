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

export interface ITravelHotel {
  id: number,
  province?: string,
  city?: string,
  contacts?: IContact[],
  address?: string,
  name?: string,
  date?: string,
  url?: string,
  remark?: string | null,
}
