import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../environment';

@Injectable()
export class AppConfigService {
  public static appConfig: EnvironmentVariables;

  constructor(private configService: ConfigService<EnvironmentVariables>) {
    AppConfigService.appConfig = {
      PORT: this.configService.get('PORT', 3000, { infer: true }),
      SWAGGER_USERNAME: this.configService.get('SWAGGER_USERNAME', 'toufiq', { infer: true }),
      SWAGGER_PASSWORD: this.configService.get('SWAGGER_PASSWORD', '1010', { infer: true }),
      DB_DRIVER: this.configService.get('DB_DRIVER', 'mysql'),
      DB_USER: this.configService.get('DB_USER'),
      DB_PASSWORD: this.configService.get('DB_PASSWORD'),
      DB_NAME: this.configService.get('DB_NAME'),
      DB_HOST: this.configService.get('DB_HOST', 'localhost'),
      DB_PORT: this.configService.get('DB_PORT', 3306, { infer: true }),
      DB_MIGRATE: this.configService.get('DB_MIGRATE', false, { infer: true }),
      ENABLE_DB_QUERY_LOG: this.configService.get('ENABLE_DB_QUERY_LOG', false, { infer: true }),
      AUTH_SVC_BASE_URL: this.configService.get('AUTH_SVC_BASE_URL')
    };
    Logger.log('AppConfigService initialized');
  }
}