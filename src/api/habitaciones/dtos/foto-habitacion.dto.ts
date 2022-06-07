import { PartialType } from '@nestjs/swagger';
import { IsDefined, IsString, IsNotEmpty } from 'class-validator';

export class CreateFotoHabitacionDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  descripcion: string;
}

export class UpdateFotoHabitacionDto extends PartialType(
  CreateFotoHabitacionDto,
) {}
