import { IsInt, IsString } from 'class-validator';

export class CreateNoteDto {
  title?: string;
  @IsInt()
  themeId?: number;
  @IsString()
  content: string;
}
