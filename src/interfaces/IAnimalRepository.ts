import { Animal } from "src/domain/Animal";

export interface IAnimalRepository {
    findById(id: number): Promise<Animal | null>;
    findByEspecie(nome: string): Promise<Animal[]>;
    save(animal: Animal): Promise<void>;
    delete(animal: Animal): Promise<void>;
    update(animal: Animal): Promise<void>;
  }