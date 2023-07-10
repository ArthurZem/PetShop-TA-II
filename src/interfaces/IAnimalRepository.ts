import { Animal } from "src/domain/Animal";

export interface IAnimalRepository {
    findById(id: number): Promise<Animal | null>;
    findByNome(nome: string): Promise<Animal[]>;
    save(animal: Animal): Promise<void>;
    delete(animal: Animal): Promise<void>;
  }