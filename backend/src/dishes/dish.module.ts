import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Dish, DishSchema } from './dish.schema';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { DishGateway } from './dish.gateway';
import { NotificationSchema, Notification } from './notification.schema';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: Dish.name, schema: DishSchema },
    { name: Notification.name, schema: NotificationSchema }
  ])],
  providers: [DishService, DishGateway, NotificationService],
  controllers: [DishController, NotificationController],
  exports: [DishGateway]
})
export class DishModule {}