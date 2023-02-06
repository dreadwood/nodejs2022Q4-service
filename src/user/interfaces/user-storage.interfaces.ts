import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

export interface UserStorage {
  findAll: () => UserEntity[];
  findOne: (id: string) => UserEntity | null;
  create: (params: CreateUserDto) => UserEntity;
  update: (id: string, newPassword: string) => UserEntity | false;
  remove: (id: string) => void | false;
}
