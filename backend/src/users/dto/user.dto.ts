import { Exclude } from 'class-transformer';

// @Exclude()
export class UserDto {
  id: number;
  username: string;
  @Exclude()
  password: string;
  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
