import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '../repository/user.repository';
import { LoginReqDto, SignUpReqDto } from '../dto/req/auth-req.dto';
import { Error } from 'mongoose';
import { UserDocument } from '../schema/user.schema';
import { LoginResDto, SignUpResDto } from '../dto/res/auth-res.dto';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { checkPassword } from '@common/utils/index';


@Injectable()
export class UserService {
  constructor(private repository: UserRepository, private jwtSercice: JwtService) {
  }

  getAccessTokenPayload(user: UserDocument): { id: string, email: string } {
    return {
      id: user._id.toString(),
      email: user.email
    };
  }

  async createUser(dto: SignUpReqDto): Promise<UserDocument> {
    try {
      return await this.repository.create({ ...dto });
    } catch (err: any) {
      switch (true) {
        case err.code === 11000: {
          let message: string = '';
          let keys = Object.keys(err.keyValue);
          for (let key of keys) {
            message += `${key} ${err.keyValue[key]} already exist`;
          }
          throw new BadRequestException(message);
        }
        default: {
          throw new Error(err);
        }
      }

    }
  }

  async signUp(dto: SignUpReqDto): Promise<SignUpResDto> {
    let user = await this.createUser(dto);
    let accessTokenPayload = this.getAccessTokenPayload(user);
    let token = await this.jwtSercice.signAsync(accessTokenPayload);
    return plainToInstance(SignUpResDto, {
      token: { accessToken: token },
      user
    }, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  async login(dto: LoginReqDto): Promise<LoginResDto> {
    let user = await this.repository.findOne({ email: dto.email });
    if (!user) {
      throw new NotFoundException('user not found');
    }
    let isPasswordMatched = await checkPassword(user.password, dto.password);
    if (!isPasswordMatched) {
      throw new UnauthorizedException('Wrong password');
    }
    let accessTokenPayload = this.getAccessTokenPayload(user);
    let token = await this.jwtSercice.signAsync(accessTokenPayload);

    return plainToInstance(LoginResDto, {
      token: { accessToken: token },
      user
    }, { excludeExtraneousValues: true, enableImplicitConversion: true });
  }

  async getUserByEmail(email: any): Promise<UserDocument> {
    return this.repository.findOne({ email });
  }
}