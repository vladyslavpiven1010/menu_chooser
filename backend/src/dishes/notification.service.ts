import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Notification, NotificationType } from './notification.schema';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>,
  ) {}

  async create(dishId: string, type: NotificationType, message: string): Promise<Notification> {
    const notification = new this.notificationModel({ dishId, type, message });
    return notification.save();
  }

  async getAll(): Promise<Notification[]> {
    return this.notificationModel.find().sort({ createdAt: -1 }).exec();
  }

  async markAllAsRead(): Promise<void> {
    await this.notificationModel.updateMany({ isRead: false }, { isRead: true });
  }

  async clear(): Promise<void> {
    await this.notificationModel.deleteMany({});
  }
}