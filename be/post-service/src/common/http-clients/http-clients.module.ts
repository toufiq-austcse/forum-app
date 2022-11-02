import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthApiService } from '@common/http-clients/auth/auth-api.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [AuthApiService],
  exports: [AuthApiService]
})
export class HttpClientsModule {
}
