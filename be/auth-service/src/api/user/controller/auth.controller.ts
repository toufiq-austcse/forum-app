import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { LoginReqDto, SignUpReqDto } from '../dto/req/auth-req.dto';
import { UserService } from '../service/user.service';
import {
  BaseApiResponse,
  SwaggerBaseApiErrorResponse,
  SwaggerBaseApiResponse
} from '@common/dto/base-api-response.dto';
import { LoginResDto, SignUpResDto, UserInfo } from '../dto/res/auth-res.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@common/guards/jwt-auth.guard';
import { UserInfoData, UserInfoDec } from '@common/decorators/user-info.decorator';
import { plainToInstance } from 'class-transformer';
import { ResponseInterceptor } from '@common/interceptors/response.interceptor';

@Controller({ version: '1', path: 'auth' })
@ApiTags('Auth')
@UseInterceptors(ResponseInterceptor)
export class AuthController {
  constructor(private userService: UserService) {
  }

  @Post('signup')
  @ApiCreatedResponse({ type: SwaggerBaseApiResponse(SignUpResDto, HttpStatus.CREATED) })
  @ApiBadRequestResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.BAD_REQUEST) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async signUp(@Body() dto: SignUpReqDto): Promise<BaseApiResponse<SignUpResDto>> {
    let data = await this.userService.signUp(dto);
    return {
      data,
      message: null
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ type: SwaggerBaseApiResponse(LoginResDto, HttpStatus.OK) })
  @ApiBadRequestResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.BAD_REQUEST) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  async login(@Body() dto: LoginReqDto): Promise<BaseApiResponse<LoginResDto>> {
    let data = await this.userService.login(dto);
    return {
      message: null,
      data

    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiSecurity('auth')
  @ApiOkResponse({ type: SwaggerBaseApiResponse(UserInfo, HttpStatus.OK) })
  @ApiBadRequestResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.BAD_REQUEST) })
  @ApiInternalServerErrorResponse({ type: SwaggerBaseApiErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR) })
  me(@UserInfoDec() user: UserInfoData): BaseApiResponse<UserInfo> {
    let data = plainToInstance(UserInfo, user, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    });
    return {
      message: null,
      data
    };
  }
}