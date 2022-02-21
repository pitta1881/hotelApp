import { Injectable } from '@nestjs/common';

@Injectable()
export class ContactoService {
  getPage(): string {
    return '<h1>Hello World!</h1>';
  }
}
