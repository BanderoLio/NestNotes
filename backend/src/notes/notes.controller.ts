import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/auth.decorator';
import { NoteDto } from './dto/note.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: User) {
    return new NoteDto(await this.notesService.create(createNoteDto, user));
  }

  @Get()
  async findAll(@GetUser() user: User) {
    return (await this.notesService.findAll(user)).map(
      (note) =>
        new NoteDto({
          ...note,
          // userId: user.id,
        }),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return new NoteDto({
      ...(await this.notesService.findOne(+id, user)),
      // userId: user.id,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateNoteDto: UpdateNoteDto,
    @GetUser() user: User,
  ) {
    return new NoteDto({
      ...(await this.notesService.update(+id, updateNoteDto, user)),
      // userId: user.id,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: User) {
    return new NoteDto({
      ...(await this.notesService.remove(+id, user)),
    });
  }
}
