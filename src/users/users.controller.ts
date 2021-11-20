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
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
} from '@nestjs/swagger';
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
  @ApiCreatedResponse({ description: 'Cadastra um novo Usuario' })
  @ApiBadRequestResponse({
    description: 'Falta preencher campos no JSON de request',
  })
  async createNewUser(@Body() newUserDto: NewUserDto): Promise<Users> {
    return await this.usersService.createUser(newUserDto);
  }

  @Put('/:_id')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({ description: 'Altera um usuario através de seu ID' })
  @ApiBadRequestResponse({ description: 'Não existe Usuario com este ID' })
  async updateUser(
    @Param('_id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.usersService.updateUser(userId, updateUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({
    description:
      'Retorna um array com todos os usuarios cadastrados no sistema',
  })
  async getAllUsers(): Promise<Array<Users>> {
    return await this.usersService.getAllUsers();
  }

  @Delete('/:_id')
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({ description: 'Deleta um usuario através de seu ID' })
  @ApiBadRequestResponse({ description: 'Não existe Usuario com este ID' })
  async deleteUser(@Param('_id') userId: string): Promise<void> {
    await this.usersService.deleteUserById(userId);
  }
}
