import { authConfig, IAuthConfig } from '../authConfig';
import { dBConfig, IDBConfig } from '../dBConfig';
import { emailConfig, IEmailConfig } from '../emailConfig';

export interface IAppConfiguration {
  database: IDBConfig;
  auth: IAuthConfig;
  email: IEmailConfig;
}

export const appConfiguration = () =>
  ({
    database: dBConfig,
    auth: authConfig,
    email: emailConfig,
  } as IAppConfiguration);
