import { Body, Controller, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotAcceptableResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@common/guards/auth.guard';
import { LikeService } from '../service/like.service';
import { LikeReqDto } from '../dto/req/like-req.dto';
import { UserInfoDec } from '@common/decorators/user-info.decorator';
import { UserInfo } from '@common/http-clients/auth/dto/res/user-info.dto';
import {
  BaseApiResponse,
  SwaggerBaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '@common/dto/base-api-response.dto';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

@ApiTags('Likes')
@Controller({ path: 'likes', version: '1' })
@UseInterceptors(ResponseInterceptor)
export class LikeController {
  constructor(private readonly likeService: LikeService) {
  }

  @Post('like')
  @UseGuards(AuthGuard(true))
  @ApiSecurity('auth')
  @ApiCreatedResponse({ type: SwaggerBaseApiResponse(String, HttpStatus.OK) })
  @ApiNotAcceptableResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.NOT_ACCEPTABLE) })
  async like(@Body() likeReq: LikeReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<null>> {
    await this.likeService.likePost(likeReq, user);
    return {
      message: null,
      data: null
    };
  }

  @Post('unlike')
  @UseGuards(AuthGuard(true))
  @ApiSecurity('auth')
  @ApiCreatedResponse({ type: SwaggerBaseApiResponse(String, HttpStatus.OK) })
  async unlike(@Body() likeReq: LikeReqDto, @UserInfoDec() user: UserInfo): Promise<BaseApiResponse<null>> {
    await this.likeService.unlikePost(likeReq, user);
    return {
      message: null,
      data: null
    };
  }
}