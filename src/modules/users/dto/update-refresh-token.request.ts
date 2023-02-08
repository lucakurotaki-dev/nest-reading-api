import { IFindById } from 'src/modules/global/dto/id.request';

export interface IUpdateRefreshTokenRequest extends IFindById {
  refreshToken: string;
}
