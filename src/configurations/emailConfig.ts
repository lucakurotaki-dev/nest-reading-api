export interface IEmailConfig {
  from: string;
  smtp: {
    host: string;
    port: string;
    auth: {
      user: string;
      password: string;
    };
  };
}

export const emailConfig = {
  from: process.env.SMTP_FROM,
  smtp: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    },
  },
} as IEmailConfig;
