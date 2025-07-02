import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { Theme } from '../entities/theme.entity';

export class NoteDto {
  id: number;
  title: string;
  theme: Theme;
  content: string;
  userId: number | null;
  @Exclude()
  user: User;
  constructor(partial: Partial<NoteDto>) {
    Object.assign(this, partial);
  }
}
