import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserStorage {
  findAll: () => UserEntity[];
  findOne: (id: string) => UserEntity;
  create: (params: CreateUserDto) => UserEntity;
  update: (id: string, params: UpdatePasswordDto) => UserEntity;
  remove: (id: string) => void;
}
