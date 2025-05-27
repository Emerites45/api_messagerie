import { ErrorModel } from './error.model';

export interface ApiResponseModel<T> {
  response: T;
  error: ErrorModel;
}
