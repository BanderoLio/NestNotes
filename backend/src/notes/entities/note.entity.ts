import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Theme } from './theme.entity';

@Entity()
export class Note {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User)
  user: User;
  @Column({ nullable: true })
  userId: number | null;
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
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
}
