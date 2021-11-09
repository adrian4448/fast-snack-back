import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FoodsController } from './foods.controller';
import { FoodsService } from './foods.service';
import { Foods, FoodsSchema } from './interfaces/foods.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Foods.name, schema: FoodsSchema }]),
  ],
  controllers: [FoodsController],
  providers: [FoodsService],
})
export class FoodsModule {}
