import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Note } from './entities/note.entity';
import { Theme } from './entities/theme.entity';
import { ThemesService } from './themes.service';
import { ThemesController } from './themes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Note, Theme])],
  controllers: [NotesController, ThemesController],
  providers: [NotesService, ThemesService],
})
export class NotesModule {}
