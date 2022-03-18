import { IsDefined, IsString } from 'class-validator';

export class CreateFotosHabitacionDto {
  @IsString()
  @IsDefined()
  nombre: string;

  @IsString()
  @IsDefined()
  descripcion: string;

  @IsString()
  @IsDefined()
  path: string;
}
