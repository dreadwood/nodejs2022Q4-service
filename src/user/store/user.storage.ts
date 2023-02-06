import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdatePasswordDto } from '../dto/update-password.dto';
import { UserDto } from '../dto/user.dto';
import { UserStorage } from '../interfaces/user-storage.interfaces';

@Injectable()
class InMemoryUserStorage implements UserStorage {
  private users: UserDto[];

  findAll(): UserDto[] {
    return this.users;
  }

  findOne(id: string): UserDto {
    // TODO: 2023-02-06 / add null | undefined
    return this.users.find((user) => user.id === id);
  }

  create(params: CreateUserDto): UserDto {
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

  update(id: string, params: UpdatePasswordDto): UserDto {
    // TODO: 2023-02-06 / add if
    const updateUser = this.users.find((user) => user.id === id);

    return Object.assign(updateUser, params);
  }

  remove(id: string): void {
    // TODO: 2023-02-06 / add if
    const removeIndex = this.users.findIndex((user) => user.id === id);

    this.users = [
      ...this.users.slice(0, removeIndex),
      ...this.users.slice(removeIndex + 1),
    ];
  }
}

export default InMemoryUserStorage;
