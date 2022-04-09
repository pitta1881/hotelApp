import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsString } from 'class-validator';

export class CreateFotoHabitacionDto {
  @IsString()
  @IsDefined()
  descripcion: string;

  @IsString()
  @IsDefined()
  path: string;
}

export class UpdateFotoHabitacionDto extends PartialType(
  CreateFotoHabitacionDto,
) {}
