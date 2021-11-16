import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodsModule } from 'src/foods/foods.module';
import { DemandsController } from './demands.controller';
import { DemandsService } from './demands.service';
import { Demand, DemandSchema } from './interfaces/demands.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Demand.name, schema: DemandSchema }]),
    FoodsModule,
  ],
  controllers: [DemandsController],
  providers: [DemandsService],
})
export class DemandsModule {}
