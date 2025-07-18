import { Module } from '@nestjs/common';
import { DishModule } from './dishes/dish.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [DishModule, MongooseModule.forRoot('mongodb://localhost:27017/dish-choose')]
})
export class AppModule {}
