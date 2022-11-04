import { Module } from '@nestjs/common';
import { IndexModule } from './index/index.module';
import { DatabaseModule } from '@common/database/database.module';
import { PostsModule } from './posts/posts.module';
import { HttpClientsModule } from '@common/http-clients/http-clients.module';
import { AppConfigModule } from '@common/app-config/app-config.module';


@Module({
  imports: [AppConfigModule, HttpClientsModule, PostsModule, DatabaseModule, IndexModule],
  controllers: [],
  providers: []
})
export class ApiModule {

}
