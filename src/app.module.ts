import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DemandModule } from './demand/demand.module';
import { CategoriesModule } from './categories/categories.module';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { DemandsModule } from './demands/demands.module';
import { TesteModule } from './teste/teste.module';

@Module({
  imports: [DemandModule, CategoriesModule, UsersModule, FoodsModule, DemandsModule, TesteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
