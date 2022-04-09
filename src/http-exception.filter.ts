import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if (!request.url.includes('/api/')) {
      response.status(status).render('pages/404', {
        pagina: request.url,
        code: exception.getStatus(),
        response: exception.getResponse(),
        pageTitle: `Error ${exception.getStatus()}`,
      });
    } else {
      response.status(status).send(exception.getResponse());
    }
  }
}
