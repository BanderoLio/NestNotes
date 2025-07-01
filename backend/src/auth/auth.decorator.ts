import { createParamDecorator, SetMetadata } from '@nestjs/common';
import { Request } from 'express';

export const TO_AUTH = 'TO_AUTH';
export const UseAuth = (to_auth: boolean) => SetMetadata(TO_AUTH, to_auth);

export const GetUser = createParamDecorator((_, context) => {
  const req = context.switchToHttp().getRequest<Request>();
  return req.user;
});
