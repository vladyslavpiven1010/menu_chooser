import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DishModule } from './app/dish.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './app/dish.entity';
import { DishController } from './app/dish.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'vlad',
      password: '1111',
      database: 'dish_database',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    DishModule, 
    ConfigModule.forRoot({ isGlobal: true })
  ],
  providers: [],
  exports: []
})
export class MainModule {}