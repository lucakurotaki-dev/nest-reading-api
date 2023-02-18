export interface IDBConfig {
  databaseUrl: string;
}

export const dBConfig = {
  databaseUrl: process.env.DATABASE_URL,
} as IDBConfig;
