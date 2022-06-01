import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

import { Huesped } from './../../../db/entities/husped.entity';

export class CreateHuespedDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  apellido: string;

  @IsEmail()
  @ValidateIf((huesped: Huesped) => huesped.email !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  email?: string | null;

  @IsInt()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsDefined()
  dni: number;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsDefined()
  fecha_nacimiento: Date;

  @IsString()
  @ValidateIf((huesped: Huesped) => huesped.telefono !== null)
  @Transform(({ value }) => {
    if (value === '') return null;
    return value;
  })
  @IsOptional()
  telefono?: string | null;
}

export class UpdateHuespedDto extends PartialType(CreateHuespedDto) {}
