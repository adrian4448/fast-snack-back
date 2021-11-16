import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewUserDto } from './dtos/new-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Users } from './interfaces/users.schema';
import { UsersService } from './users.service';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async createNewUser(@Body() newUserDto: NewUserDto): Promise<Users> {
    return await this.usersService.createUser(newUserDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('_id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(userId, updateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers(): Promise<Array<Users>> {
    return await this.usersService.getAllUsers();
  }

  @Delete('/:_id')
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Param('_id') userId: string): Promise<void> {
    await this.usersService.deleteUserById(userId);
  }
}
