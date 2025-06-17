import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return new UserDto(await this.usersService.create(createUserDto));
  }

  @Get()
  async findAll() {
    return (await this.usersService.findAll()).map((u) => new UserDto(u));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new UserDto(await this.usersService.findOne(+id));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return new UserDto(await this.usersService.update(+id, updateUserDto));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new UserDto(await this.usersService.remove(+id));
  }
}
