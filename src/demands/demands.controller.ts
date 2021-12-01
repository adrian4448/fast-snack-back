import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FoodDto } from 'src/foods/dtos/food.dto';
import { DemandsService } from './demands.service';
import { NewDemandDto } from './dtos/new-demand.dto';
import { Demand } from './interfaces/demands.schema';

@ApiTags('Pedidos')
@Controller('/demands')
export class DemandsController {
  constructor(private readonly demandsService: DemandsService) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ description: 'Cadastra um novo Pedido' })
  @ApiBadRequestResponse({
    description: 'Falta preencher campos no JSON de request',
  })
  async createDemand(@Body() newDemandDto: NewDemandDto): Promise<Demand> {
    return await this.demandsService.createNewDemand(newDemandDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({
    description: 'Retorna um array contendo todos os pedidos',
  })
  async getAllDemands(): Promise<Array<Demand>> {
    return await this.demandsService.findAllDemands();
  }

  @Get('/:demandId')
  @UsePipes(ValidationPipe)
  @ApiAcceptedResponse({ description: 'Retorna um pedido através de seu ID' })
  @ApiBadRequestResponse({
    description: 'Pedido com este ID não foi encontrado',
  })
  async getDemandById(@Param('demandId') demandId: string): Promise<Demand> {
    return await this.demandsService.findDemandById(demandId);
  }

  @Patch('/demandItens/:demandId')
  @UsePipes(ValidationPipe)
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({
    description: 'Atualiza os itens de um pedido, através de seu ID',
  })
  @ApiBadRequestResponse({
    description:
      'Pedido com este ID não foi encontrado ou não existe alimento com este nome',
  })
  async updateDemandItens(
    @Param('demandId') demandId: string,
    @Body() demandItens: Array<FoodDto>,
  ): Promise<void> {
    await this.demandsService.updateDemandItens(demandId, demandItens);
  }

  @Patch('/status/:demandId/:status')
  @UseGuards(AuthGuard('jwt'))
  @ApiAcceptedResponse({ description: 'Altera o status de um pédido' })
  @ApiBadRequestResponse({
    description:
      'Pedido com este ID não foi encontrado ou não existe status com este nome',
  })
  async alterDemandStatus(
    @Param('demandId') demandId: string,
    @Param('status') demandStatus: string,
  ): Promise<void> {
    await this.demandsService.alterDemandStatus(demandId, demandStatus);
  }
}
