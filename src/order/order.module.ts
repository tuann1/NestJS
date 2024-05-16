import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { User } from 'src/users/users.entity';
import { Fruits } from 'src/fruits/fruits.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Fruits])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
