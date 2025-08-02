import { Controller, Get, Post, Delete, Param, Body, Query, Put } from '@nestjs/common';
import { DishService } from './dish.service';
import { DishGateway } from './dish.gateway';
import { NotificationService } from './notification.service';
import { Dish, DishEatTime } from './dish.schema';

@Controller('dishes')
export class DishController {
  constructor(
    private readonly dishService: DishService,
    private readonly dishGateway: DishGateway,
    private readonly notificationService: NotificationService
  ) {}

  @Get()
  findAll(@Query('search') search: string) {
    return this.dishService.findAll(search);
  }

  @Post()
  create(@Body() body: Partial<Dish>) {
    return this.dishService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.dishService.delete(id);
  }

  @Post(':id/choose')
  async choose(@Param('id') id: string, @Body() body: { eatTime: DishEatTime }) {
    const { eatTime } = body;

    const dish = await this.dishService.chooseDish(id, eatTime);

    if (dish) {
      const message = `New dish chosen: ${dish.name} for ${eatTime}`;

      await this.notificationService.create(id, 'choose', message);
      this.dishGateway.sendDishNotification(message);
    }

    return dish;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: Partial<Dish>) {
    const dish = await this.dishService.update(id, body);

    if (dish) {
      const message = `Dish ${dish.name} has been updated`;
      await this.notificationService.create(id, 'update', message);
      this.dishGateway.sendDishCancelNotification(id, message);
    }

    return dish;
  }

  @Post(':id/cancel')
  async cancel(@Param('id') id: string) {
    const dish = await this.dishService.cancelDish(id);

    if (dish) {
      const message = `Dish ${dish.name} has been cancelled`;
      await this.notificationService.create(id, 'cancel', message);
      this.dishGateway.sendDishCancelNotification(id, message);
    }

    return dish;
  }

  @Post(':id/disable')
  disable(@Param('id') id: string) {
    return this.dishService.disableDish(id);
  }

  @Post(':id/enable')
  enable(@Param('id') id: string) {
    return this.dishService.enableDish(id);
  }
}