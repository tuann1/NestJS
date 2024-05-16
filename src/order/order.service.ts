import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './order.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { Fruits } from 'src/fruits/fruits.entity';
import { User } from 'src/users/users.entity';
import { OrderController } from './order.controller';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderController.name);
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    @InjectRepository(Fruits)
    private fruitRepository: Repository<Fruits>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllOrders(): Promise<Order[]> {
    return await this.orderRepository.find({ relations: ['user', 'fruit'] });
  }

  async listOrderByUser(userId: number): Promise<Order[]> {
    // Tạo đối tượng FindOneOptions<User>
    const userOptions: FindOneOptions<User> = {
      where: { id: userId },
    };

    const user = await this.userRepository.findOne(userOptions);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return await this.orderRepository.find({
      where: { user },
      relations: ['user', 'fruit'],
    });
  }

  async createOrder(
    userId: number,
    fruitId: number,
    amount: number,
  ): Promise<Order> {
    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException('User not found');
      }

      const fruit = await this.fruitRepository.findOne({
        where: { id: fruitId },
      });
      if (!fruit) {
        throw new NotFoundException('Fruit not found');
      }

      const order = new Order();
      order.user = user;
      order.fruit = fruit;
      order.amount = amount;

      return await this.orderRepository.save(order);
    } catch (error) {
      this.logger.error('Error creating order:', error.message);
      throw error;
    }
  }
}
