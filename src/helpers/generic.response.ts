export enum StatusTypes {
  success = 'SUCCESS',
  error = 'ERROR',
}

export interface IGenResp {
  status: StatusTypes;
  total?: number;
  data?: any[];
  error?: string;
}
