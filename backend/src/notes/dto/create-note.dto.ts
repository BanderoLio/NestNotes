import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsOptional()
  @IsString()
  title?: string;
  @IsOptional()
  @IsInt()
  themeId?: number;
  @IsString()
  content: string;
}
