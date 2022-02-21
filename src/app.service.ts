import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getPage(): string {
    return 'Hello World!';
  }
}
