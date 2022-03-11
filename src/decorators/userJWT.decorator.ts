import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUsuario } from './../api/usuarios/usuario.interface';

export const UserJWT = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): IUsuario => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
