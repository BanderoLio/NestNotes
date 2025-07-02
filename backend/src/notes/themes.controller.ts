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

@UseInterceptors(ClassSerializerInterceptor)
@Controller('themes')
export class ThemesController {
  constructor(private themesService: ThemesService) {}
  @Get()
  findAll() {
    return this.themesService.findAll();
  }
  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number,
    @Query('desc', new DefaultValuePipe(false), ParseBoolPipe) desc: boolean,
  ) {
    return desc
      ? this.themesService.findDescendants(await this.themesService.findOne(id))
      : this.themesService.findOne(id);
  }
  @Post()
  create(@Body() createThemeDto: CreateThemeDto) {
    return this.themesService.create(createThemeDto);
  }
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateThemeDto: UpdateThemeDto,
  ) {
    return this.themesService.update(id, updateThemeDto);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.themesService.delete(id);
  }
}
