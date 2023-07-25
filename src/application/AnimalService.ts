import { IAnimalRepository } from "src/interfaces/IAnimalRepository";
import { Cliente } from "src/domain/Cliente";
import {Animal} from '../domain/Animal'

export class AnimalService{
    private animalRepository: IAnimalRepository;
    private animais: Animal[] = [];

    constructor(animalRepository:IAnimalRepository){
        this.animalRepository = animalRepository;
    }

    public async criarAnimal(id: number, nome: string, especie: string, raca: string, idade: number, dono: Cliente): Promise<Animal>{
        const animalExistente = await this.animalRepository.findById(id);
        if(animalExistente){
            throw new Error('ID já cadastrado para outro cliente.')
        }
        const animal = new Animal(id,nome,especie,raca,idade,dono);
        await this.animalRepository.save(animal);

        return animal;
    }

    public async findById(id:number): Promise<Animal | null> {
        const animal = await this.animalRepository.findById(id);

        return animal;
    }
    
    public async findByEspecie(nome:string) : Promise<Animal[]>{
        const animal = await this.animalRepository.findByEspecie(nome);

        return animal;
    }

    public async delete(animal: Animal): Promise<void> {
        const index = this.animais.findIndex((c) => c.id === animal.id);

        if (index !== -1) {
            this.animais.splice(index, 1);
        }
    }

}