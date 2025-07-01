import { IsNotEmpty, IsString } from 'class-validator';

export class CreateNoteDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  theme: string;
  @IsString()
  content: string;
}
