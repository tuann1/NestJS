import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Fruits {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  amount: number;
}
