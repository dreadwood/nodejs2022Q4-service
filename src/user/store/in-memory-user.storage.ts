import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserStorage } from '../interfaces/user-storage.interfaces';

@Injectable()
class InMemoryUserStorage implements UserStorage {
  private users: UserEntity[] = [];

  findAll(): UserEntity[] {
    return this.users;
  }

  findOne(id: string): UserEntity | null {
    const user = this.users.find((user) => user.id === id);

    return user ?? null;
  }

  create(params: CreateUserDto): UserEntity {
    const date = Date.now();
    const newUser = {
      ...params,
      id: uuidv4(),
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: string, newPassword: string): UserEntity | false {
    const updateIndex = this.users.findIndex((user) => user.id === id);

    if (updateIndex === -1) {
      return false;
    }

    this.users[updateIndex] = {
      ...this.users[updateIndex],
      password: newPassword,
      version: this.users[updateIndex].version + 1,
    };

    return this.users[updateIndex];
  }

  remove(id: string): void | false {
    const removeIndex = this.users.findIndex((user) => user.id === id);

    if (removeIndex === -1) {
      return false;
    }

    this.users = [
      ...this.users.slice(0, removeIndex),
      ...this.users.slice(removeIndex + 1),
    ];
  }
}

export default InMemoryUserStorage;
