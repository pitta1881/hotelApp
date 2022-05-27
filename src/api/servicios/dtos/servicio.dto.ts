import { Transform } from 'class-transformer';
import { PartialType } from '@nestjs/swagger';
import { IsBoolean, IsDefined, IsString } from 'class-validator';

export class CreateServicioDto {
  @IsString()
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

  @IsString()
  @IsDefined()
  icon_path: string;
}

export class UpdateServicioDto extends PartialType(CreateServicioDto) {}
