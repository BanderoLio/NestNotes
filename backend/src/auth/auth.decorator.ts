import { SetMetadata } from '@nestjs/common';

export const TO_AUTH = 'TO_AUTH';
export const UseAuth = (to_auth: boolean) => SetMetadata(TO_AUTH, to_auth);
