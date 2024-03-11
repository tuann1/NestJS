import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FruitsController } from './fruits.controller';
import { FruitsService } from './fruits.service';
import { Fruits } from './fruits.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fruits])],
  controllers: [FruitsController],
  providers: [FruitsService],
})
export class FruitsModule {}
