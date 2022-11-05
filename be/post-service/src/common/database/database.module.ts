import { Global, Logger, Module } from '@nestjs/common';
import dataSource from 'ormconfig';
import { DataSource } from 'typeorm';
import { AppConfigService } from '@common/app-config/service/app-config.service';

@Global()
@Module({
  providers: [
    {
      provide: DataSource,
      inject: [AppConfigService],
      useFactory: async () => {
        let db = await dataSource.initialize();
        const queryRunner = await db.createQueryRunner();
        try {
          if (AppConfigService.appConfig.DB_NAME) {
            await queryRunner.manager.query(
              `CREATE DATABASE IF NOT EXISTS ${AppConfigService.appConfig.DB_NAME} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
            );
            Logger.log(`${AppConfigService.appConfig.DB_NAME} db created`);
          }

        } catch (e) {
          console.log('DB Cannot Created ', e);
        }

        return dataSource;
      }
    }

  ],
  exports: [DataSource]
})
export class DatabaseModule {
}
