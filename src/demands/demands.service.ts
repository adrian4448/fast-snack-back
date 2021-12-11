import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FoodDto } from 'src/foods/dtos/food.dto';
import { FoodsService } from 'src/foods/foods.service';
import { NewDemandDto } from './dtos/new-demand.dto';
import { Demand, DemandDocument } from './interfaces/demands.schema';
import { StatusEnum } from './interfaces/enums/demand.status.enum';

@Injectable()
export class DemandsService {
  constructor(
    @InjectModel(Demand.name)
    private readonly demandModel: Model<DemandDocument>,
    private readonly foodsService: FoodsService,
  ) {}

  async createNewDemand(newDemandDto: NewDemandDto): Promise<Demand> {
    const demandToSave = new this.demandModel(newDemandDto);
    demandToSave.status = StatusEnum.WAITING;
    return await demandToSave.save();
  }

  async findAllDemands(): Promise<Array<Demand>> {
    return await this.demandModel.find();
  }

  async findDemandById(demandId: string): Promise<Demand> {
    await this.verifyDemandExistence(demandId);
    const demandFound = await this.demandModel
      .findOne({ _id: demandId })
      .exec();
    return demandFound;
  }

  async updateDemandItens(
    demandId: string,
    demandItens: Array<FoodDto>,
  ): Promise<void> {
    await this.verifyDemandExistence(demandId);
    const demandFound: Demand = await this.findDemandById(demandId);

    if (demandFound.status == StatusEnum.DONE) {
      throw new BadRequestException(`This demand has been conclude`);
    }

    for (const foodItem of demandItens) {
      await this.foodsService.verifyFoodExistenceByName(foodItem.name);
    }

    demandFound.foods = demandItens;
    await this.demandModel
      .findOneAndUpdate({ _id: demandId }, { $set: demandFound })
      .exec();
  }

  async alterDemandStatus(
    demandId: string,
    demandStatus: string,
  ): Promise<void> {
    await this.verifyDemandExistence(demandId);
    const demandFound: Demand = await this.findDemandById(demandId);

    if (!StatusEnum[demandStatus]) {
      throw new NotFoundException(`Status ${demandStatus} not exist's`);
    }

    demandFound.status = StatusEnum[demandStatus];
    await this.demandModel
      .findOneAndUpdate({ _id: demandId }, { $set: demandFound })
      .exec();
  }

  async verifyDemandExistence(demandId: string) {
    const demandFound = await this.demandModel
      .findOne({ _id: demandId })
      .exec();
    if (!demandFound) {
      throw new NotFoundException(`Demand with ID: ${demandId} not found !`);
    }
  }
}
