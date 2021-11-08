import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewUserDto } from './dtos/new-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDocument, Users } from './interfaces/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name) private readonly usersModel: Model<UserDocument>,
  ) {}

  async createUser(newUser: NewUserDto): Promise<Users> {
    const userToSave = new this.usersModel(newUser);
    return await userToSave.save();
  }

  async updateUser(userId: string, updateUser: UpdateUserDto): Promise<void> {
    await this.verifyUserExistence(userId);

    await this.usersModel.findOneAndUpdate(
      { _id: userId },
      { $set: updateUser },
    );
  }

  async getAllUsers(): Promise<Array<Users>> {
    return await this.usersModel.find();
  }

  async deleteUserById(userId: string): Promise<void> {
    await this.verifyUserExistence(userId);
    await this.usersModel.findOneAndDelete({ _id: userId });
  }

  async verifyUserExistence(userId: string): Promise<void> {
    const userFound = await this.usersModel.findOne({ _id: userId }).exec();

    if (!userFound) {
      throw new NotFoundException(`User with id ${userId} not found !`);
    }
  } 
}
