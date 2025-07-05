import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ThemesService } from './themes.service';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { GetUser } from '../auth/auth.decorator';
import { User } from '../users/entities/user.entity';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('themes')
export class ThemesController {
  constructor(private themesService: ThemesService) {}
  @Get()
  findAll(@GetUser() user: User) {
    return this.themesService.findAll(user);
  }
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('findDescendants', new DefaultValuePipe(false), ParseBoolPipe)
    findDescendants: boolean,
    @GetUser() user: User,
  ) {
    return findDescendants
      ? this.themesService.findDescendants(
          await this.themesService.findOne(id, user),
        )
      : this.themesService.findOne(id, user);
  }
  @Post()
  create(@Body() createThemeDto: CreateThemeDto, @GetUser() user: User) {
    return this.themesService.create(createThemeDto, user);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateThemeDto: UpdateThemeDto,
    @GetUser() user: User,
  ) {
    return this.themesService.update(id, updateThemeDto, user);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number, @GetUser() user: User) {
    return this.themesService.delete(id, user);
  }
}
