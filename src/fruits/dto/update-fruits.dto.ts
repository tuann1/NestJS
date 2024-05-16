import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateFruitDto {
  @IsNumber()
  @IsOptional()
  amount: number;
}
