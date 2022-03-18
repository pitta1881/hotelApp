import { IsOptional, IsString } from 'class-validator';

export class UpdateFotosHotelDto {
  @IsString()
  @IsOptional()
  descripcion?: string;
}
