import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import InMemoryUserStorage from './store/in-memory-user.storage';

@Injectable()
export class UserService {
  constructor(private storage: InMemoryUserStorage) {}

  create(createUserDto: CreateUserDto) {
    return this.storage.create(createUserDto);
  }

  findAll() {
    return this.storage.findAll();
  }

  findOne(id: string) {
    return this.storage.findOne(id);
  }

  update(id: string, updateUserDto: UpdatePasswordDto) {
    return this.storage.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
