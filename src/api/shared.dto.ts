import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class SharedDto {
  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsOptional()
  id?: number;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsOptional()
  carouselId?: number;
}
