import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateThemeDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsInt()
  parentId?: number;
}
