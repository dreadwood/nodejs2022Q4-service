import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserDto } from '../dto/user.dto';

export interface UserStorage {
  findAll: () => UserDto[];
  findOne: (id: string) => UserDto;
  create: (params: CreateUserDto) => UserDto;
  update: (id: string, params: UpdatePasswordDto) => UserDto;
  remove: (id: string) => void;
}
