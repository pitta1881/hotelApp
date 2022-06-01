import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsPositive,
  Min,
  MinDate,
} from 'class-validator';
import { IsDateGreaterThan } from '../../../decorators/IsGreaterThan.decorator';

export class CreateReservaDto {
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MinDate(new Date())
  @IsDefined()
  checkin: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsDateGreaterThan('checkin', {
    message: 'checkout must be greater than checkin',
  })
  @IsDefined()
  checkout: string;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    if (value === '0') return Number(value);
    return value;
  })
  @IsDefined()
  monto_final: number;

  @IsNumber()
  @Min(0)
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    if (value === '0') return Number(value);
    return value;
  })
  @IsOptional()
  monto_pagado: number;

  @IsNumber()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    if (value === '0') return Number(value);
    return value;
  })
  @IsDefined()
  habitacionId: number;
}

export class UpdateReservaDto extends PartialType(CreateReservaDto) {}
