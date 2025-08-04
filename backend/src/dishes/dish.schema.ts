import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DishDocument = Dish & Document;
export type DishEatTime = 'breakfast' | 'lunch' | 'dinner' | 'snack' ;

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

  @Prop({
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    default: null,
  })
  chosenToday: DishEatTime | null;
}

export const DishSchema = SchemaFactory.createForClass(Dish);