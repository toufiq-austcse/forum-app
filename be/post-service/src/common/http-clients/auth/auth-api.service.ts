import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AppConfigService } from '../../app-config/service/app-config.service';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthApiService {
  constructor(private httpService: HttpService) {
  }

  async validateToken(accessToken: string): Promise<UserInfo> {
    try {
      let res = await firstValueFrom(this.httpService.get(`${AppConfigService.appConfig.AUTH_SVC_BASE_URL}/me`));
      return res.data.data;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}