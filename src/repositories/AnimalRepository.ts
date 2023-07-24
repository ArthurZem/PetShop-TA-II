import { IAnimalRepository } from 'src/interfaces/IAnimalRepository';
import { Animal } from 'src/domain/Animal';

export class AnimalRepository implements IAnimalRepository {
  private animais: Animal[];

  constructor() {
    this.animais = [];
  }
    findByEspecie(especie: string): Promise<Animal[]> { 
      return new Promise( (resolve, reject)=>{
        const results = this.animais.filter(animal => animal.especie === especie);
        resolve(results);
      });
    }

  public async findById(id: number): Promise<Animal | null> {
    const cliente = this.animais.find((c) => c.id === id);
    return cliente || null;
  }

  public async save(animal: Animal): Promise<void> {
    const index = this.animais.findIndex((c) => c.id === animal.id);

    if (index === -1) {
      this.animais.push(animal);
    } else {
      this.animais[index] = animal;
    }
  }

  public async delete(animal: Animal): Promise<void> {
    const index = this.animais.findIndex((c) => c.id === animal.id);

    if (index !== -1) {
      this.animais.splice(index, 1);
    }
  }
}