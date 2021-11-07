import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { NewUserDto } from './dtos/new-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Users } from './interfaces/users.entity';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createNewUser(@Body() newUserDto: NewUserDto): Promise<Users> {
    return await this.usersService.createUser(newUserDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  async updateUser(
    @Param('_id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(userId, updateUserDto);
  }

  @Get()
  async getAllUsers(): Promise<Array<Users>> {
    return await this.usersService.getAllUsers();
  }

  @Delete('/:_id')
  async deleteUser(@Param('_id') userId: string): Promise<void> {
    await this.usersService.deleteUserById(userId);
  }
}
