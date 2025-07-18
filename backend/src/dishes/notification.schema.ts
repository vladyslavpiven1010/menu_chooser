import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationType = 'choose' | 'cancel';

@Schema({ timestamps: true })
export class Notification extends Document {
  @Prop({ required: true })
  dishId: string;

  @Prop({ required: true })
  type: NotificationType;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  isRead: boolean;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);