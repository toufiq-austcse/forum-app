import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/user.schema';
import { UserService } from './service/user.service';
import { UserRepository } from './repository/user.repository';
import { AuthController } from './controller/auth.controller';
import { getHashedPassword } from '@common/utils/index';
import { JwtModule } from '@nestjs/jwt';
import { AppConfigService } from '@common/app-config/service/app-config.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { UserController } from './controller/user.controller';


@Module({
  imports: [JwtModule.registerAsync({
    inject: [AppConfigService],
    useFactory: () => {
      return {
        secret: AppConfigService.appConfig.JWT_SECRET
      };
    }
  }), MongooseModule.forFeatureAsync([{
    name: User.name,
    useFactory: () => {
      let schema = UserSchema;
      schema.pre('save', async function() {
        const user = this;
        user.password = await getHashedPassword(user.password);
      });
      return schema;
    }
  }])],
  controllers: [AuthController, UserController],
  providers: [UserService, UserRepository, JwtStrategy],
  exports: [UserService]
})
export class UserModule {
}
