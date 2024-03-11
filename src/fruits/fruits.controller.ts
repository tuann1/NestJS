import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateFruitsDto } from './dto/create-fruits.dto';
import { FruitsService } from './fruits.service';
import { Fruits } from './fruits.entity';

@Controller('fruits')
export class FruitsController {
  constructor(private fruitsService: FruitsService) {}

  @Get('/all')
  async getAllFruits(): Promise<Fruits[]> {
    return await this.fruitsService.getAllFruits();
  }

  @Get('/:id')
  async getFruitById(@Param('id') id: number): Promise<Fruits> {
    return await this.fruitsService.getFruitById(id);
  }

  @Post('/create')
  createFruits(@Body() body: CreateFruitsDto) {
    this.fruitsService.create(body.name, body.amount);
  }
}
