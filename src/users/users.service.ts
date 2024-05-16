import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async getAllUser(): Promise<User[]> {
    return await this.repository.find();
  }

  async getUserById(id: number): Promise<User> {
    return await this.repository.findOne({ where: { id } });
  }

  create(name: string, email: string) {
    const user = this.repository.create({ name, email });

    return this.repository.save(user);
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  async remove(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.repository.remove(user);
  }
}
