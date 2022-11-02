import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { AuthApiService } from '@common/http-clients/auth/auth-api.service';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authApiService: AuthApiService) {
  }

  async canActivate(
    context: ExecutionContext
  ): Promise<boolean> {
    let request = context.switchToHttp().getRequest<Request>();
    let { authorization } = request.headers;
    if (!authorization) {
      throw new BadRequestException('Authorization required in header');
    }
    let userInfo = await this.authApiService.validateToken(authorization);
    (request as any)['user'] = userInfo;
    return true;
  }
}