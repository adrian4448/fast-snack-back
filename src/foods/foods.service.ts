import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewFoodDto } from './dtos/new-food.dto';
import { UpdateFoodDto } from './dtos/update-food.dto';
import { FoodDocument, Foods } from './interfaces/foods.schema';

@Injectable()
export class FoodsService {
  constructor(
    @InjectModel(Foods.name) private readonly foodsModel: Model<FoodDocument>,
  ) {}

  async saveNewFood(newFoodDto: NewFoodDto): Promise<Foods> {
    await this.verifyFoodNameDuplicity(newFoodDto.name);
    const foodToSave = new this.foodsModel(newFoodDto);
    return await foodToSave.save();
  }

  async updateFood(
    foodId: string,
    updateFoodDto: UpdateFoodDto,
  ): Promise<void> {
    await this.verifyFoodExistenceById(foodId);
    await this.foodsModel.findOneAndUpdate(
      { _id: foodId },
      { $set: updateFoodDto },
    );
  }

  async findAllFoods(): Promise<Array<Foods>> {
    return await this.foodsModel.find().exec();
  }

  async findFoodById(foodId: string): Promise<Foods> {
    await this.verifyFoodExistenceById(foodId);
    return await this.foodsModel.findOne({ _id: foodId }).exec();
  }

  async deleteFoodById(foodId: string): Promise<void> {
    await this.verifyFoodExistenceById(foodId);
    await this.foodsModel.findOneAndDelete({ _id: foodId }).exec();
  }

  private async verifyFoodExistenceById(foodId: string) {
    const foodFound = await this.foodsModel.findOne({ _id: foodId }).exec();
    if (!foodFound) {
      throw new NotFoundException(`Food with ID: ${foodId} not found !`);
    }
  }

  async verifyFoodExistenceByName(foodName: string) {
    const foodFound = await this.foodsModel.findOne({ name: foodName }).exec();
    if (!foodFound) {
      throw new NotFoundException(`Food with name: ${foodName} not found !`);
    }
  }

  private async verifyFoodNameDuplicity(foodName: string): Promise<void> {
    const foodAlreadyExists = await this.foodsModel
      .findOne({ name: foodName })
      .exec();
    if (foodAlreadyExists) {
      throw new BadRequestException(
        `A food with name: ${foodName} already exist's in the database`,
      );
    }
  }
}
