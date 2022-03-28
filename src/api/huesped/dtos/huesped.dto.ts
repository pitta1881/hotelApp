import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsDefined, IsEmail, IsInt, IsString } from 'class-validator';

export class CreateHuespedDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  apellido: string;

  @IsEmail()
  @IsDefined()
  email: string;

  @IsInt()
  @IsDefined()
  dni: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsDefined()
  fecha_nacimiento: Date;

  @IsString()
  @IsDefined()
  telefono: string;
}

export class UpdateHuespedDto extends PartialType(CreateHuespedDto) {}
