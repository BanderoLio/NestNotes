import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { TreeRepository } from 'typeorm';
import { CreateThemeDto } from './dto/create-theme.dto';
import { UpdateThemeDto } from './dto/update-theme.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme) private themeRepository: TreeRepository<Theme>,
  ) {}
  async create(createThemeDto: CreateThemeDto, user: User) {
    await this.checkName(createThemeDto.name);
    const theme = new Theme();
    theme.name = createThemeDto.name;
    theme.user = user;
    if (createThemeDto.parentId) {
      theme.parent = await this.findOne(createThemeDto.parentId, user);
    }
    return await this.themeRepository.save(theme);
  }
  async delete(id: number, user: User) {
    const theme = await this.findOne(id, user);
    await this.themeRepository.delete(id);
    return theme;
  }
  async findOne(id: number, user: User) {
    const theme = await this.themeRepository.findOne({
      where: { id, user },
      relations: { parent: true },
    });
    if (!theme) throw new NotFoundException(`Theme with id ${id} not found`);
    return theme;
  }
  findDescendants(theme: Theme) {
    return this.themeRepository.findDescendants(theme);
  }
  findAll(user: User) {
    return this.themeRepository.find({ where: { user } });
  }
  async update(
    id: number,
    updateThemeDto: UpdateThemeDto,
    user: User,
  ): Promise<Theme> {
    let theme = await this.findOne(id, user);
    if (updateThemeDto.name && updateThemeDto.name !== theme.name)
      await this.checkName(updateThemeDto.name);
    const { parentId, ...updateThemeFields } = updateThemeDto;
    if (parentId) {
      theme.parent = await this.findOne(parentId, user);
    } else if (parentId === null) {
      theme.parent = null;
    }
    theme = {
      ...theme,
      ...updateThemeFields,
    } as Theme;
    return await this.themeRepository.save(theme);
  }
  async checkName(name: string) {
    if (await this.themeRepository.findOne({ where: { name } })) {
      throw new ConflictException(`Theme with name ${name} already exists`);
    }
  }
}
