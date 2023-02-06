import { IsString, IsUUID } from 'class-validator';

export class UserEntity {
  @IsUUID(4)
  id: string;

  @IsString()
  login: string;

  @IsString()
  password: string;

  version: number;
  createdAt: number;
  updatedAt: number;
}
