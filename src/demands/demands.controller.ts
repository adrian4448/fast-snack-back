import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FoodDto } from 'src/foods/dtos/food.dto';
import { DemandsService } from './demands.service';
import { NewDemandDto } from './dtos/new-demand.dto';
import { Demand } from './interfaces/demands.schema';

@Controller('/demands')
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @UsePipes(ValidationPipe)
  @Post()
  async createDemand(@Body() newDemandDto: NewDemandDto): Promise<Demand> {
    return await this.demandsService.createNewDemand(newDemandDto);
  }

  @Get()
  async getAllDemands(): Promise<Array<Demand>> {
    return await this.demandsService.findAllDemands();
  }

  @Get(':/demandId')
  async getDemandById(@Param('demandId') demandId: string): Promise<Demand> {
    return await this.demandsService.findDemandById(demandId);
  }

  @UsePipes(ValidationPipe)
  @Patch('/demandItens/:demandId')
  async updateDemandItens(
    @Param('demandId') demandId: string,
    @Body() demandItens: Array<FoodDto>,
  ): Promise<void> {
    await this.demandsService.updateDemandItens(demandId, demandItens);
  }

  @Patch('/status/:demandId/:status')
  async alterDemandStatus(
    @Param('demandId') demandId: string,
    @Param('status') demandStatus: string,
  ): Promise<void> {
    await this.demandsService.alterDemandStatus(demandId, demandStatus);
  }
}
