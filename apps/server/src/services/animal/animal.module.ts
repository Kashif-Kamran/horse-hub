import { Module } from '@nestjs/common';
import { AnimalController } from './animal.controller';
import { CreateAnimalUseCase } from './usecases/create-animal.usecase';
import { DatabaseModule } from 'src/database/database.module';
import { ListAnimalsUseCase } from './usecases/list-animals.usecase';

@Module({
  imports: [DatabaseModule],
  controllers: [AnimalController],
  providers: [CreateAnimalUseCase, ListAnimalsUseCase],
})
export class AnimalModule {}
