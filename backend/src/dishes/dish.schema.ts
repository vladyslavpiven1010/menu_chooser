import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DishDocument = Dish & Document;
export type DishEatTime = 'breakfast' | 'lunch' | 'dinner' | 'supper' ;

@Schema({ timestamps: true })
export class Dish {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ type: [String], required: true })
  ingredients: string[];

  @Prop({ type: [String], default: ['breakfast'] })
  eatTime: DishEatTime;

  @Prop()
  imageUrl: string;

  @Prop({ enum: ['girlfriend', 'admin'], required: true })
  createdBy: 'girlfriend' | 'admin';

  @Prop({ default: false })
  disabledByYouToday: boolean;

  @Prop({ default: false })
  chosenToday: boolean;
}

export const DishSchema = SchemaFactory.createForClass(Dish);