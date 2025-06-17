import { registerAs } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export default registerAs(
  'jwt',
  (): JwtModuleOptions => ({
    secret:
      process.env.JWT_SECRET ??
      'cc6c4f147a3793e76427507c9cf2c219523a59e55956bdd3e7248ead67093aa6',
  }),
);
