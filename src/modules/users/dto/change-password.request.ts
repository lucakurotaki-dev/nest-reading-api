import { IFindUserByEmailRequest } from './find-user-by-email.request';

export interface IChangePasswordRequest extends IFindUserByEmailRequest {
  password: string;
}
