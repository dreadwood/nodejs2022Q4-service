import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpException,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { isUUID } from 'class-validator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException(
        'User ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userService.findOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!isUUID(id, 4)) {
      throw new HttpException(
        'User ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userService.findRawOne(id);

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new HttpException('Old password is wrong', HttpStatus.FORBIDDEN);
    }

    return this.userService.update(id, updatePasswordDto.newPassword);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    if (!isUUID(id, 4)) {
      throw new HttpException(
        'User ID is invalid (not uuid)',
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = this.userService.remove(id);

    if (user === false) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
