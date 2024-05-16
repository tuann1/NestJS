import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruits } from './fruits.entity';

@Injectable()
export class FruitsService {
  constructor(@InjectRepository(Fruits) private repo: Repository<Fruits>) {}

  async getAllFruits(): Promise<Fruits[]> {
    return await this.repo.find();
  }

  async getFruitById(id: number): Promise<Fruits> {
    return await this.repo.findOne({ where: { id } });
  }

  create(name: string, amount: number) {
    const fruit = this.repo.create({ name, amount });

    return this.repo.save(fruit);
  }

  async update(id: number, attrs: Partial<Fruits>) {
    const fruit = await this.getFruitById(id);
    if (!fruit) {
      throw new NotFoundException('Fruit not found');
    }
    Object.assign(fruit, attrs);
    return this.repo.save(fruit);
  }

  async remove(id: number) {
    const fruit = await this.getFruitById(id);
    if (!fruit) {
      throw new NotFoundException('Fruit not found');
    }
    return this.repo.remove(fruit);
  }
}
