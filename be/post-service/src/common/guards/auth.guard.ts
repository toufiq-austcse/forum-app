import { BadRequestException, CanActivate, ExecutionContext, Injectable, mixin, Type } from '@nestjs/common';
import { AuthApiService } from '@common/http-clients/auth/auth-api.service';
import { Request } from 'express';

export const AuthGuard = (throwErrorIfKeyNotPresentInHeader: boolean): Type<CanActivate> => {
  @Injectable()
  class AuthGuard implements CanActivate {
    constructor(private authApiService: AuthApiService) {
    }

    async canActivate(
      context: ExecutionContext
    ): Promise<boolean> {
      let request = context.switchToHttp().getRequest<Request>();
      let { authorization } = request.headers;
      console.log('authorization ', authorization);
      if (!authorization) {
        if (throwErrorIfKeyNotPresentInHeader) {
          throw new BadRequestException('Authorization required in header');
        }
        return true;
      }
      (request as any)['user'] = await this.authApiService.validateToken(authorization);
      return true;
    }
  }

  return mixin(AuthGuard);
};

