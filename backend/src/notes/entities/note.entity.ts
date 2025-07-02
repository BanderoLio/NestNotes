import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Theme } from './theme.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  userId: number | null;
  @ManyToOne(() => User)
  user: User;
  @Column({
    nullable: true,
  })
  title?: string;
  @ManyToOne(() => Theme, (theme) => theme.notes, { onDelete: 'SET NULL' })
  theme: Theme;
  @Column({
    type: 'text',
  })
  content: string;
}
