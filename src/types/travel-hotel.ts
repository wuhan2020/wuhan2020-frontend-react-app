import moment from 'moment';

export interface IHotel{
  id?: number;
  province?: string;
  city?: string;
  contacts?: IContact[];
  address?: string;
  name?: string;
  date?: string;
  url?: string;
  remarl?: string
}

export interface IContact {
  name?: string;
  tel?: string[]
}
