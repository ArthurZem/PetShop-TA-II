import { IAnimalRepository } from 'src/interfaces/IAnimalRepository';
import { Animal } from 'src/domain/Animal';

export class AnimalRepository implements IAnimalRepository {
  private animais: Animal[];

  constructor() {
    this.animais = [];
  }
    findByNome(nome: string): Promise<Animal[]> { 
      return new Promise( (resolve, reject)=>{
        const results = this.animais.filter(animal => animal.nome === nome);
        resolve(results);
      });
    }

  public async findById(id: number): Promise<Animal | null> {
    // Busca um cliente pelo ID no array de clientes em memória
    const cliente = this.animais.find((c) => c.id === id);
    return cliente || null;
  }

  public async save(animal: Animal): Promise<void> {
    // Adiciona ou atualiza um cliente no array de clientes em memória
    const index = this.animais.findIndex((c) => c.id === animal.id);

    if (index === -1) {
      // Se o cliente não existe, adiciona no array
      this.animais.push(animal);
    } else {
      // Se o cliente já existe, atualiza no array
      this.animais[index] = animal;
    }
  }

  public async delete(animal: Animal): Promise<void> {
    // Remove um cliente do array de clientes em memória
    const index = this.animais.findIndex((c) => c.id === animal.id);

    if (index !== -1) {
      // Se o cliente existe no array, remove
      this.animais.splice(index, 1);
    }
  }
}