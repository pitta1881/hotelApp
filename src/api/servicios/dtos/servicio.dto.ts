import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  nombre: string;

  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsDefined()
  servInstal: boolean;
}

export class UpdateServicioDto extends PartialType(CreateServicioDto) {}
