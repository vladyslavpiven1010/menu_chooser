import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish, DishDocument } from './dish.schema';

@Injectable()
export class DishService {
  constructor(
    @InjectModel(Dish.name) private dishModel: Model<DishDocument>
  ) {}

  async findAll(search?: string) {
    const filter = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};
    return this.dishModel.find(filter).exec();
  }

  async create(data: Partial<Dish>) {
    const created = new this.dishModel(data);
    return created.save();
  }

  async delete(id: string) {
    return this.dishModel.findByIdAndDelete(id);
  }

  async chooseDish(id: string) {
    return await this.dishModel.findByIdAndUpdate(id, { chosenToday: true }, { new: true });;
  }

  async cancelDish(id: string) {
    return this.dishModel.findByIdAndUpdate(id, { chosenToday: false }, { new: true });
  }

  async disableDish(id: string) {
    return this.dishModel.findByIdAndUpdate(id, { disabledByYouToday: true }, { new: true });
  }

  async enableDish(id: string) {
    return this.dishModel.findByIdAndUpdate(id, { disabledByYouToday: false }, { new: true });
  }
}