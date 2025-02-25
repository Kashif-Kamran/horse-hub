import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AnimalModel } from 'src/database';
import { AnimalResponse } from '@repo/shared';
import { AnimalDocument } from 'src/database/models/animal.model';
import { mapDocumentToResponse } from '../mappers/document-to-response.mapper';

@Injectable()
export class GETAnimalByIdUsecase {
  constructor(
    @InjectModel('Animal') private readonly animalModel: AnimalModel,
  ) {}

  async execute(id: string): Promise<AnimalResponse> {
    const animal: AnimalDocument = await this.animalModel.findById(id);

    if (!animal) {
      throw new Error('Animal not found');
    }
    return mapDocumentToResponse(animal);
  }
}
