import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { UserService } from '../service/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AppConfigService.appConfig.JWT_SECRET
    });
  }

  async validate(payload: any) {
    let { email } = payload;
    let user = await this.userService.getUserByEmail(email);
    delete user.password;
    return user;
  }
}