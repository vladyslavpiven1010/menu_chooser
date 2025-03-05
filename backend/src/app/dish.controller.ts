import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { DishService } from './dish.service';
import { Dish } from './dish.entity';

@Controller('dishes')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  @Get()
  async findAll() {
    return await this.dishService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.dishService.findOne(id);
  }

  @Post()
  async create(@Body() createDishDto: Partial<Dish>) {
    return await this.dishService.create(createDishDto);
  }

  @Patch(':id/update_selectability')
  async updateSelectability(@Param('id') id: number, @Body() selectability: boolean) {
    const currentDish = await this.dishService.findOne(id);

    if (currentDish?.is_selectable === selectability) throw new BadRequestException("This selectability already set");

    return await this.dishService.setSelectability(id, selectability);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateDishDto: Partial<Dish>) {
    return await this.dishService.update(+id, updateDishDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.dishService.remove(id);
  }
}
