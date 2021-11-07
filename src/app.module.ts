import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { DemandsModule } from './demands/demands.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:YLgz1RCkjhk10Kuu@cluster0.jvn8j.mongodb.net/fastSnack?retryWrites=true&w=majority',
    ),
    UsersModule,
    FoodsModule,
    DemandsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
