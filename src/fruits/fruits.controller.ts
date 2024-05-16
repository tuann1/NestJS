import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { CreateFruitsDto } from './dto/create-fruits.dto';
import { UpdateFruitDto } from './dto/update-fruits.dto';
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
  async getFruitById(@Param('id') id: string): Promise<Fruits> {
    const fruit = await this.fruitsService.getFruitById(parseInt(id));
    if (!fruit) {
      throw new NotFoundException('Fruit not found');
    }
    return fruit;
  }

  @Post('/create')
  createFruit(@Body() body: CreateFruitsDto) {
    this.fruitsService.create(body.name, body.amount);
  }

  @Delete('/delete/:id')
  removeFruit(@Param('id') id: string) {
    return this.fruitsService.remove(parseInt(id));
  }

  @Patch('/update/:id')
  updateFruit(@Param('id') id: string, @Body() body: UpdateFruitDto) {
    return this.fruitsService.update(parseInt(id), body);
  }
}
