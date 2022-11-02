import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@common/database/database.module';
import { UserModule } from './user/user.module';
import { AppConfigModule } from '@common/app-config/app-config.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), AppConfigModule, DatabaseModule, IndexModule, UserModule],
  controllers: [],
  providers: []
})
export class ApiModule {

}
