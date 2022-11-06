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
      let res = await firstValueFrom(this.httpService.get(`${AppConfigService.appConfig.AUTH_SVC_BASE_URL}/v1/auth/me`, {
        headers: {
          'Authorization': accessToken
        }
      }));
      return res.data.data;
    } catch (err: any) {
      console.log(err);
      throw new Error(err);
    }
  }

  async fetchUserList(userIds: string[]): Promise<Record<string, UserInfo>> {
    try {
      let userList: Record<string, UserInfo> = {};
      let res = await firstValueFrom(this.httpService.post(`${AppConfigService.appConfig.AUTH_SVC_BASE_URL}/v1/users`, {
        user_ids: userIds
      }));
      res.data.data.forEach((user: UserInfo) => userList[user.id] = user);
      return userList;
    } catch (err: any) {
      throw new Error(err);
    }
  }
}