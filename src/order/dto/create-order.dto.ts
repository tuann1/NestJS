import { IsInt, IsPositive } from 'class-validator';

export class CreateOrder {
  @IsInt()
  @IsPositive()
  userId: number;

  @IsInt()
  @IsPositive()
  fruitId: number;

  @IsInt()
  @IsPositive()
  amount: number;
}
