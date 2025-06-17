import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request } from 'express';
import { UseAuth } from './auth.decorator';
import { UserDto } from '../users/dto/user.dto';

@UseAuth(false)
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
  @UseAuth(true)
  @Get('get_me')
  get_me(@Req() req: Request) {
    return req.user ? new UserDto(req.user) : null;
  }
}
