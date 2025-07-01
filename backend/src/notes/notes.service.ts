import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note) private noteRepository: Repository<Note>,
  ) {}
  create(createNoteDto: CreateNoteDto, user: User) {
    return this.noteRepository.save({
      ...createNoteDto,
      user,
    });
  }

  findAll(user: User) {
    return this.noteRepository.find({
      // relations: { user: true },
      where: { user },
    });
  }

  async findOne(id: number, user: User) {
    const note = await this.noteRepository.findOne({ where: { id, user } });
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
    await this.noteRepository.update(id, {
      ...updateNoteDto,
    });
    return {
      ...note,
      ...updateNoteDto,
    };
  }

  async remove(id: number, user: User) {
    const note = await this.findOne(id, user);
    await this.noteRepository.delete(id);
    return note;
  }
}
