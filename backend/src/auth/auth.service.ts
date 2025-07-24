import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { compare } from 'bcrypt';
import { Jwt, JwtPayload } from './interfaces/jwt.interface';
import { RegisterDto } from './dto/register.dto';
import { CodeError } from '../common/errors/code.error';
import { AuthErrorCodes } from './enums/errorcodes.enum';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  async login(loginDto: LoginDto): Promise<Jwt> {
    const user = await this.usersService.findByName(loginDto.username);
    if (!user) {
      throw new UnauthorizedException(
        new CodeError(
          AuthErrorCodes.USER_NOT_FOUND,
          `User with name ${loginDto.username} not found`,
        ),
      );
    }
    if (!(await compare(loginDto.password, user.password))) {
      throw new UnauthorizedException(
        new CodeError(AuthErrorCodes.WRONG_PASSWORD, `Wrong password provided`),
      );
    }
    const payload: Partial<JwtPayload> = { sub: user.id };
    return {
      accessToken: await this.jwtService.signAsync(
        { ...payload, type: 'Access' } as JwtPayload,
        { expiresIn: '15h' },
      ),
      refreshToken: await this.jwtService.signAsync(
        { ...payload, type: 'Refresh' } as JwtPayload,
        { expiresIn: '7d' },
      ),
    };
  }

  async register(registerDto: RegisterDto): Promise<Jwt> {
    await this.usersService.create({
      username: registerDto.username,
      password: registerDto.password,
    });
    return this.login(registerDto);
  }

  async authenticate(access_token: string) {
    try {
      const payload =
        await this.jwtService.verifyAsync<JwtPayload>(access_token);
      return await this.usersService.findOne(payload.sub);
    } catch {
      throw new UnauthorizedException(
        new CodeError(AuthErrorCodes.WRONG_TOKEN, 'Wrong token provided'),
      );
    }
  }
}
