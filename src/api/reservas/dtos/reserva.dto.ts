import { PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsDefined,
  IsNumber,
  IsPositive,
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
  @IsDefined()
  monto_final: number;

  @IsNumber()
  @IsPositive()
  @IsDefined()
  monto_pagado: number;

  @IsNumber()
  @IsPositive()
  @IsDefined()
  habitacionId: number;
}

export class UpdateReservaDto extends PartialType(CreateReservaDto) {}
