import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Dish } from './dish.schema';
import { Model } from 'mongoose';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectModel(Dish.name) private readonly dishModel: Model<Dish>
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async clearChosenToday() {
    await this.dishModel.updateMany(
      { chosenToday: { $ne: null } },
      { $set: { chosenToday: null } }
    );
    this.logger.log(`Cleared chosenToday`);

    await this.dishModel.updateMany({}, { $set: { disabledByYouToday: false } });
    this.logger.log(`Cleared disabledByYouToday`);
  }


}