import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishService } from './dish.service';
import { Dish } from './dish.entity';
import { DishController } from './dish.controller';

@Module({
  providers: [
    DishService
  ],
  exports: [
    DishService
  ],
  controllers: [
    DishController
  ],
  imports: [
    TypeOrmModule.forFeature([Dish])
  ]
})
export class DishModule {}