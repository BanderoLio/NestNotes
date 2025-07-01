import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

export class NoteDto {
  id: number;
  title: string;
  theme: string;
  content: string;
  user_id: number;
  @Exclude()
  user: User;
  constructor(partial: Partial<NoteDto>) {
    Object.assign(this, partial);
  }
}
