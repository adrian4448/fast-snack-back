import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { FoodsModule } from './foods/foods.module';
import { DemandsModule } from './demands/demands.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:YLgz1RCkjhk10Kuu@cluster0.jvn8j.mongodb.net/fastSnack?retryWrites=true&w=majority',
    ),
    UsersModule,
    FoodsModule,
    DemandsModule,
    AuthModule,
  ],
})
export class AppModule {}
