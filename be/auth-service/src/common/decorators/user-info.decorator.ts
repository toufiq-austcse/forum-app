import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const UserInfoDec = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user;
});

export interface UserInfoData {
  id: number;
  email: string;
  username: string;
}