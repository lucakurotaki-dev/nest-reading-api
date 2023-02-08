import { IFindUserByEmailRequest } from './find-user-by-email.request';

export interface IFindUserByRecoveryPasswordTokenAndEmailRequest
  extends IFindUserByEmailRequest {
  recoveryPasswordToken: string;
}
