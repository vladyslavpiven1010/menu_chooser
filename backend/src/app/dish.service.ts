import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dish } from './dish.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
  ) {}

  async findAll() {
    const dishes = await this.dishRepository.find();

    return dishes;
  }

  async findOne(id: number) {
    return await this.dishRepository.findOneBy({ id });
  }

  async create(dish: Partial<Dish>) {
    return await this.dishRepository.save(dish);
  }

  async setSelectability(id: number, selectable: boolean) {
    return await this.dishRepository.update(id, {is_selectable: selectable});
  }

  async update(id: number, dish: Partial<Dish>) {
    return await this.dishRepository.update(id, dish);
  }

  async remove(id: number) {
    return await this.dishRepository.delete(id);
  }
}
