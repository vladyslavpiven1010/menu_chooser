import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dish, DishDocument, DishEatTime } from './dish.schema';

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

  async update(id: string, updateData: Partial<Dish>) {
    return this.dishModel.findByIdAndUpdate(id, updateData, { new: true });
  }

  async delete(id: string) {
    return this.dishModel.findByIdAndDelete(id);
  }

  async chooseDish(id: string, eatTime: DishEatTime) {
    await this.dishModel.updateMany(
      { chosenToday: eatTime },
      { $set: { chosenToday: null } }
    );

    return this.dishModel.findByIdAndUpdate(
      id,
      { $set: { chosenToday: eatTime } },
      { new: true }
    );
  }

  async cancelDish(id: string) {
    return this.dishModel.findByIdAndUpdate(id, { chosenToday: null }, { new: true });
  }

  async disableDish(id: string) {
    return this.dishModel.findByIdAndUpdate(id, { disabledByYouToday: true }, { new: true });
  }

  async enableDish(id: string) {
    return this.dishModel.findByIdAndUpdate(id, { disabledByYouToday: false }, { new: true });
  }
}