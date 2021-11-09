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
import { NewFoodDto } from './dtos/new-food.dto';
import { UpdateFoodDto } from './dtos/update-food.dto';
import { FoodsService } from './foods.service';
import { Foods } from './interfaces/foods.entity';

@Controller('/foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async createNewFood(@Body() newFoodDto: NewFoodDto): Promise<Foods> {
    return await this.foodsService.saveNewFood(newFoodDto);
  }

  @Put('/:foodId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  async updateFood(
    @Param('foodId') foodId: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<void> {
    await this.foodsService.updateFood(foodId, updateFoodDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllFoods(): Promise<Array<Foods>> {
    return await this.foodsService.findAllFoods();
  }

  @Get('/:foodId')
  @UseGuards(AuthGuard('jwt'))
  async getFoodById(@Param('foodId') foodId: string): Promise<Foods> {
    return await this.foodsService.findFoodById(foodId);
  }

  @Delete('/:foodId')
  @UseGuards(AuthGuard('jwt'))
  async deleteFoodById(@Param('foodId') foodId: string): Promise<void> {
    await this.foodsService.deleteFoodById(foodId);
  }
}
