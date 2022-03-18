import { Type } from 'class-transformer';
import { IsDefined, IsInt, IsPositive } from 'class-validator';

export class GetPaypertopDto {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  @IsDefined()
  id: number;
}
