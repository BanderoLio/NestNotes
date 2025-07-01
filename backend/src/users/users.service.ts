import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    await this.checkUsername(createUserDto.username);
    return this.userRepository.save({
      ...createUserDto,
      password: await this.hashPassword(createUserDto.password),
    });
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findOne(id: number) {
    return await this.getUser(id);
  }

  async findByName(username: string) {
    return await this.userRepository.findOne({ where: { username } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUser(id);
    if (updateUserDto.username)
      await this.checkUsername(updateUserDto.username);
    if (updateUserDto.password)
      updateUserDto = {
        ...updateUserDto,
        password: await this.hashPassword(updateUserDto.password),
      };
    await this.userRepository.update(id, updateUserDto);
    return {
      ...user,
      ...updateUserDto,
    };
  }

  async remove(id: number) {
    const user = await this.getUser(id);
    await this.userRepository.delete(id);
    return user;
  }

  private async getUser(id: number) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
  private async checkUsername(username: string) {
    const user = await this.userRepository.findOne({ where: { username } });
    if (user) {
      throw new ConflictException(`User with name ${username} already exists`);
    }
  }
  private async hashPassword(password: string) {
    return hash(password, 10);
  }
}
