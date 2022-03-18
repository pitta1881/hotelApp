import { IsDefined, IsInt, IsPositive, IsString } from 'class-validator';

export class CreateFotosHotelDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  descripcion: string;

  @IsString()
  @IsDefined()
  path: string;

  @IsInt()
  @IsPositive()
  @IsDefined()
  tipoCarouselId: number;
}
