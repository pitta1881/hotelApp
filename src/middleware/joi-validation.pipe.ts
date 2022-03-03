import { StatusTypes } from './../helpers/generic.response';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(value: any, metadata: ArgumentMetadata) {
    const { error } = this.schema.validate(value, { abortEarly: false });
    if (error) {
      const errores = error.details.map((detalle) => detalle.message);
      throw new BadRequestException({
        status: StatusTypes.error,
        error: errores,
      });
    }
    return value;
  }
}
