import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { User } from '../users/entities/user.entity';
import { ThemesService } from './themes.service';
import { NoteFiltersQuery } from './interfaces/note.query.interface';
import { PageParam } from '../common/interfaces/page-param.interface';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
    private themesService: ThemesService,
  ) {}
  async create(createNoteDto: CreateNoteDto, user: User): Promise<Note> {
    const { themeId, ...createNoteFields } = createNoteDto;
    const note = new Note();
    Object.assign(note, createNoteFields);
    note.user = user;
    if (themeId) note.theme = await this.themesService.findOne(themeId, user);
    return this.noteRepository.save(note);
  }

  findAndCount(
    user: User,
    { limit, skip }: PageParam,
    filters: NoteFiltersQuery,
    order?: FindOptionsOrder<Note>,
  ) {
    const where: FindOptionsWhere<Note> = { userId: user.id };
    if (filters.content) {
      where.content = ILike(`%${filters.content}%`);
    }
    if (filters.title) {
      where.title = ILike(`%${filters.title}%`);
    }
    if (filters.themeIds) {
      where.theme = { id: In(filters.themeIds) };
    }

    return this.noteRepository.findAndCount({
      relations: { theme: true },
      where,
      take: limit,
      skip,
      order: order ?? { createdAt: 'DESC' },
    });
  }

  async findOne(id: number, user: User) {
    const note = await this.noteRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!note) {
      throw new NotFoundException(`Note with id ${id} not found`);
    }
    return note;
  }

  async update(
    id: number,
    updateNoteDto: UpdateNoteDto,
    user: User,
  ): Promise<Note> {
    const note = await this.findOne(id, user);
    const { themeId, ...updateNoteFields } = updateNoteDto;
    Object.assign(note, updateNoteFields);
    if (themeId) note.theme = await this.themesService.findOne(themeId, user);
    return this.noteRepository.save(note);
  }

  async remove(id: number, user: User) {
    const note = await this.findOne(id, user);
    await this.noteRepository.delete(id);
    return note;
  }
}
