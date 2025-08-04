import { Module } from '@nestjs/common';
import { DishModule } from './dishes/dish.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [DishModule, MongooseModule.forRoot('mongodb://localhost:27017/dish-choose'), ScheduleModule.forRoot()]
})
export class AppModule {}
