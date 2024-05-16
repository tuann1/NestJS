import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Logger,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';
import { CreateOrder } from './dto/create-order.dto';

@Controller('orders')
export class OrderController {
  private readonly logger = new Logger(OrderController.name);

  constructor(private orderService: OrderService) {}

  @Get('/all')
  async getAllOrders(): Promise<Order[]> {
    return this.orderService.getAllOrders();
  }

  @Get('/user/:userId')
  async getOrdersByUser(@Param('userId') userId: number): Promise<Order[]> {
    const orders = await this.orderService.listOrderByUser(userId);
    if (!orders.length) {
      throw new NotFoundException('User has no orders');
    }
    return orders;
  }

  @Post('/create')
  async createOrder(
    @Body() body: CreateOrder,
  ): Promise<Order | { error: string }> {
    try {
      const order = await this.orderService.createOrder(
        body.userId,
        body.fruitId,
        body.amount,
      );
      return order;
    } catch (error) {
      this.logger.error('Error creating order:', error.message);
      return {
        error: 'There was an error creating the order. Please try again later.',
      };
    }
  }
}
