import { FindOptionsOrderValue } from 'typeorm';
import { IsOptional } from 'class-validator';

export class NoteSortingDto {
  @IsOptional()
  createdAt?: FindOptionsOrderValue;
  @IsOptional()
  updatedAt?: FindOptionsOrderValue;
}
