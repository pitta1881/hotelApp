import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

export class QueryTableDto {
  @IsInt()
  @Min(0)
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    if (value === '0') return Number(value);
    return value;
  })
  @IsOptional()
  skip?: number;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => {
    if (Number(value)) return Number(value);
    return value;
  })
  @IsOptional()
  limit?: number;
}
