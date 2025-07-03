import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Note } from './note.entity';
import { Exclude } from 'class-transformer';
import { User } from '../../users/entities/user.entity';

@Entity()
@Tree('closure-table')
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @Exclude()
  @Column({ nullable: true })
  userId: number;
  @ManyToOne(() => User)
  user: User;
  @OneToMany(() => Note, (note) => note.theme, { onDelete: 'SET NULL' })
  notes: Note[];
  // @Exclude()
  @TreeParent({ onDelete: 'SET NULL' })
  parent: Theme | null;
  // @Exclude()
  @TreeChildren()
  children: Theme[];
}

// @Entity()
// export class Theme {
//   @PrimaryGeneratedColumn()
//   id: number;
//   @Column()
//   name: string;
//   @OneToMany(() => Note, (note) => note.theme)
//   notes: Note[];
//   @Exclude()
//   @ManyToOne(() => Theme, (theme) => theme.children)
//   parent: Theme;
//   @Exclude()
//   @OneToMany(() => Theme, (theme) => theme.parent)
//   children: Theme[];
// }
