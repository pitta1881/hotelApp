export enum StatusTypes {
  success = 'SUCCESS',
  error = 'ERROR',
}

export interface IGenResp {
  status: StatusTypes;
  data?: any[];
  error?: string;
}
