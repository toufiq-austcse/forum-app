import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from '@common/database/database.module';
import { PostsModule } from './posts/posts.module';
import { HttpClientsModule } from '@common/http-clients/http-clients.module';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true
  }), HttpClientsModule, PostsModule, DatabaseModule, IndexModule],
  controllers: [],
  providers: []
})
export class ApiModule {

}
