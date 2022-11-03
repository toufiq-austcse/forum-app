import { Body, Controller, HttpCode, HttpStatus, Post, UseInterceptors } from '@nestjs/common';
import { FetchUserDetailsReqDto } from '../dto/req/user-req.dto';
import { UserService } from '../service/user.service';
import { BaseApiResponse, SwaggerBaseApiResponse } from '@common/dto/base-api-response.dto';
import { UserInfo } from '../dto/res/auth-res.dto';
import { ApiOkResponse } from '@nestjs/swagger';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

@Controller({ path: 'users', version: '1' })
@UseInterceptors(ResponseInterceptor)
export class UserController {
  constructor(private userService: UserService) {
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SwaggerBaseApiResponse([UserInfo], HttpStatus.OK) })
  async userDetails(@Body() body: FetchUserDetailsReqDto): Promise<BaseApiResponse<UserInfo[]>> {
    let data = await this.userService.fetchUserList(body);
    return {
      message: null,
      data
    };
  }
}