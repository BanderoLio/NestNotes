import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';
import { Note } from './note.entity';
import { Exclude } from 'class-transformer';

@Entity()
@Tree('closure-table')
export class Theme {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true })
  name: string;
  @OneToMany(() => Note, (note) => note.theme)
  notes: Note[];
  // @Exclude()
  @TreeParent()
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
