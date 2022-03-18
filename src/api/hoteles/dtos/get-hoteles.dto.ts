import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class GetHotelesDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsDefined()
  id: number;
}
