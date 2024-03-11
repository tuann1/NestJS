import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Fruits } from './fruits.entity';
import { create } from 'domain';

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
}
