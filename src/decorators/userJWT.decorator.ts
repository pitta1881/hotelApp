import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtPayload } from '../api/auth/jwtPayload.interface';

export const UserJWT = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IJwtPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
