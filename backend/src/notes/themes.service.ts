import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { TreeRepository } from 'typeorm';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme) private themeRepository: TreeRepository<Theme>,
  ) {}
  async create(createThemeDto: CreateThemeDto) {
    const theme = new Theme();
    theme.name = createThemeDto.name;
    if (createThemeDto.parentId) {
      theme.parent = await this.findOne(createThemeDto.parentId);
    }
    return await this.themeRepository.save(theme);
  }
  async delete(id: number) {
    const theme = await this.findOne(id);
    await this.themeRepository.delete(id);
    return theme;
  }
  async findOne(id: number) {
    const theme = await this.themeRepository.findOne({
      where: { id },
      relations: { parent: true },
    });
    if (!theme) throw new NotFoundException(`Theme with id ${id} not found`);
    return theme;
  }
  findDescendants(theme: Theme) {
    return this.themeRepository.findDescendants(theme);
  }
  findAll() {
    return this.themeRepository.find();
  }
  async update(id: number, updateThemeDto: UpdateThemeDto): Promise<Theme> {
    let theme = await this.findOne(id);
    const { parentId, ...updateThemeFields } = updateThemeDto;
    if (parentId) {
      theme.parent = await this.findOne(parentId);
    } else if (parentId === null) {
      theme.parent = null;
    }
    theme = {
      ...theme,
      ...updateThemeFields,
    } as Theme;
    return await this.themeRepository.save(theme);
  }
}
