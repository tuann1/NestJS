import { Order } from 'src/order/order.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  OneToMany,
} from 'typeorm';

@Entity()
export class Fruits {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;

  @OneToMany(() => Order, (order) => order.fruit)
  orders: Order[];

  @AfterInsert()
  logInsert() {
    console.log('Inserted Fruit with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Fruit with id: ', this.id);
  }
}
