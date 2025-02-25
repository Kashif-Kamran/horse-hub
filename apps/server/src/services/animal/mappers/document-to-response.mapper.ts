import { AnimalDocument } from 'src/database/models/animal.model';
import { AnimalPublic } from '@repo/shared';

function mapDocumentToResponse(doc: AnimalDocument): AnimalPublic {
  return {
    _id: doc._id,
    id: doc._id,
    name: doc.name,
    activityLevel: doc.activityLevel,
    age: doc.age,
    breed: doc.breed,
    healthStatus: doc.healthStatus,
    specialDietRequirement: doc.specialDietRequirement,
    species: doc.species,
    weight: doc.weight,
  };
}

export { mapDocumentToResponse };
