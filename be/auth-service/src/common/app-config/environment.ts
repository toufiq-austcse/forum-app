export interface EnvironmentVariables {
  PORT: number;
  SWAGGER_USERNAME: string;
  SWAGGER_PASSWORD: string;
  DB_DRIVER: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_HOST: string;
  DB_PORT: number;
  DB_MIGRATE: boolean;
  ENABLE_DB_QUERY_LOG: boolean;
  JWT_SECRET: string;
}