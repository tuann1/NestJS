import { IsString, IsNumber } from 'class-validator';

export class CreateFruitsDto {
  @IsString()
  name: string;

  @IsNumber()
  amount: number;
}
