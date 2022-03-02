export enum StatusTypes {
  success = 'SUCCESS',
  error = 'ERROR',
}

export interface IGenericResponse {
  status: StatusTypes;
  data?: any[];
  error?: string;
}
