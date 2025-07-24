import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { User } from '../users/entities/user.entity';
import { GetUser } from '../auth/auth.decorator';
import { NoteDto } from './dto/note.dto';
import { PaginatedResponse } from '../common/interfaces/paginated-response.interface';
import { ParseSortingPipe } from '../common/pipes/parse-sorting.pipe';
import { NoteSortingDto } from './dto/note-sorting.dto';
import { FindOptionsOrder } from 'typeorm';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto, @GetUser() user: User) {
    return new NoteDto(await this.notesService.create(createNoteDto, user));
  }

  @Get()
  async findAll(
    @GetUser() user: User,
    @Query('limit', ParseIntPipe) limit: number,
    @Query('skip', new DefaultValuePipe(0), ParseIntPipe) skip: number,
    @Query('sorting', ParseSortingPipe)
    sorting?: NoteSortingDto,
    @Query('title') title?: string,
    @Query('content') content?: string,
    @Query(
      'themeIds',
      new ParseArrayPipe({ items: Number, separator: ',', optional: true }),
    )
    themeIds?: number[],
  ): Promise<PaginatedResponse<NoteDto>> {
    const [notes, total] = await this.notesService.findAndCount(
      user,
      { limit, skip },
      {
        title,
        content,
        themeIds,
      },
      sorting,
    );
    return {
      data: notes.map((note) => new NoteDto(note)),
      meta: {
        limit,
        skip,
        total,
      },
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: User) {
    return new NoteDto({
      ...(await this.notesService.findOne(+id, user)),
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
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @GetUser() user: User) {
    return new NoteDto({
      ...(await this.notesService.remove(+id, user)),
    });
  }
}
