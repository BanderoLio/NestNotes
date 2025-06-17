import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { TO_AUTH } from './auth.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const useAuth = this.reflector.getAllAndOverride<boolean | undefined>(
      TO_AUTH,
      [context.getHandler(), context.getClass()],
    );
    if (useAuth === false) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    try {
      const access_token = req.headers.authorization?.split(' ')[1] as string;
      req.user = await this.authService.authenticate(access_token);
      return true;
    } catch {
      throw new UnauthorizedException(`Wrong authentication credentials`);
    }
  }
}
