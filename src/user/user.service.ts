import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
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

  findRawOne(id: string) {
    return this.storage.findRawOne(id);
  }

  update(id: string, newPassword: string) {
    return this.storage.update(id, newPassword);
  }

  remove(id: string) {
    return this.storage.remove(id);
  }
}
