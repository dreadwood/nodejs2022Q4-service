import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserResponseEntity } from '../entities/user-response.entity';
import { UserEntity } from '../entities/user.entity';
import { UserStorage } from '../interfaces/user-storage.interfaces';

@Injectable()
class InMemoryUserStorage implements UserStorage {
  private users: UserEntity[] = [];

  findAll(): UserResponseEntity[] {
    return this.users.map((user) => this.removeUserPassword(user));
  }

  findOne(id: string): UserResponseEntity | null {
    const user = this.users.find((user) => user.id === id);

    return user ? this.removeUserPassword(user) : null;
  }

  findRawOne(id: string): UserEntity | null {
    const user = this.users.find((user) => user.id === id);

    return user ?? null;
  }

  create(params: CreateUserDto): UserResponseEntity {
    const date = Date.now();
    const newUser = {
      ...params,
      id: uuidv4(),
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    this.users.push(newUser);

    return this.removeUserPassword(newUser);
  }

  update(id: string, newPassword: string): UserResponseEntity | false {
    const updateIndex = this.users.findIndex((user) => user.id === id);

    if (updateIndex === -1) {
      return false;
    }

    this.users[updateIndex] = {
      ...this.users[updateIndex],
      password: newPassword,
      version: this.users[updateIndex].version + 1,
      updatedAt: Date.now(),
    };

    return this.removeUserPassword(this.users[updateIndex]);
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

  private removeUserPassword(user: UserEntity): UserResponseEntity {
    const preparedUser = { ...user };
    delete preparedUser.password;

    return preparedUser;
  }
}

export default InMemoryUserStorage;
