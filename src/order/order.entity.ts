import { Fruits } from 'src/fruits/fruits.entity';
import { User } from 'src/users/users.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @ManyToOne(() => Fruits, (fruit) => fruit.orders)
  fruit: Fruits;

  @AfterInsert()
  logInsert() {
    console.log('Inserted Order with id: ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated Order with id: ', this.id);
  }
}
