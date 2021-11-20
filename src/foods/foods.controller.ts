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
import { NewFoodDto } from './dtos/new-food.dto';
import { UpdateFoodDto } from './dtos/update-food.dto';
import { FoodsService } from './foods.service';
import { Foods } from './interfaces/foods.schema';

@Controller('/foods')
export class FoodsController {
  constructor(private readonly foodsService: FoodsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ description: 'Cadastra um novo Alimento' })
  @ApiBadRequestResponse({
    description: 'Falta preencher campos no JSON de request',
  })
  async createNewFood(@Body() newFoodDto: NewFoodDto): Promise<Foods> {
    return await this.foodsService.saveNewFood(newFoodDto);
  }

  @Put('/:foodId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({ description: 'Atualiza um novo Alimento pelo ID' })
  @ApiBadRequestResponse({ description: 'Não existe alimento com este ID' })
  async updateFood(
    @Param('foodId') foodId: string,
    @Body() updateFoodDto: UpdateFoodDto,
  ): Promise<void> {
    await this.foodsService.updateFood(foodId, updateFoodDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({
    description:
      'Retorna um array contendo todos os alimentos cadastrados no sistema',
  })
  async getAllFoods(): Promise<Array<Foods>> {
    return await this.foodsService.findAllFoods();
  }

  @Get('/:foodId')
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({ description: 'Retorna um Alimento através de seu ID' })
  @ApiBadRequestResponse({ description: 'Não existe alimento com este ID' })
  async getFoodById(@Param('foodId') foodId: string): Promise<Foods> {
    return await this.foodsService.findFoodById(foodId);
  }

  @Delete('/:foodId')
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({ description: 'Deleta um Alimento através de seu ID' })
  @ApiBadRequestResponse({ description: 'Não existe alimento com este ID' })
  async deleteFoodById(@Param('foodId') foodId: string): Promise<void> {
    await this.foodsService.deleteFoodById(foodId);
  }
}
