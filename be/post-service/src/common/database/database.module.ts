import { Global, Module } from '@nestjs/common';
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
        await dataSource.initialize();
        return dataSource;
      }
    }

  ],
  exports: [DataSource]
})
export class DatabaseModule {
}
