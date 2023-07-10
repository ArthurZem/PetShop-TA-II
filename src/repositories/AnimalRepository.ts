import { Animal } from "src/domain/Animal";
import { IAnimalRepository } from "src/interfaces/IAnimalRepository";

export class AnimalRepository implements IAnimalRepository{
    findById(id: number): Promise<Animal | null> {
        throw new Error("Method not implemented.");
    }
    findByNome(nome: string): Promise<Animal[]> {
        throw new Error("Method not implemented.");
    }
    save(animal: Animal): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(animal: Animal): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}