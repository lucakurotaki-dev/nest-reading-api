export interface IAuthConfig {
  jwt: {
    secret: string;
    accessToken: {
      expiresIn: string;
    };
    refreshToken: {
      expiresIn: string;
    };
  };
}

export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'secret#12345',
    accessToken: {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN || '10m',
    },
    refreshToken: {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN || '20m',
    },
  },
} as IAuthConfig;
