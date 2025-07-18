import { Controller, Get, Delete, Patch } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get()
  async getAll() {
    return this.notificationService.getAll();
  }

  @Patch('read-all')
  async markAllAsRead() {
    return this.notificationService.markAllAsRead();
  }

  @Delete()
  async clear() {
    await this.notificationService.clear();
    return { message: 'Notification history cleared' };
  }
}