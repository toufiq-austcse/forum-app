import { ApiProperty } from '@nestjs/swagger';
import { Expose, plainToInstance, Transform } from 'class-transformer';

export class TokenRes {
  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.accessToken)
  access_token: string;
}

export class UserInfo {
  @ApiProperty()
  @Expose()
  @Transform(val => val.obj._id.toString())
  id: string;

  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.email)
  email: string;

  @ApiProperty()
  @Expose()
  @Transform(val => val.obj.username)
  username: string;
}

export class SignUpResDto {
  @ApiProperty()
  @Expose()
  @Transform((val) =>
    plainToInstance(TokenRes, val.obj.token, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    })
  )
  token: TokenRes;


  @ApiProperty()
  @Expose()
  @Transform((val) =>
    plainToInstance(UserInfo, val.obj.user, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true
    })
  )
  user_info: UserInfo;
}

export class LoginResDto extends SignUpResDto {

}
