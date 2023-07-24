import { IAnimalRepository } from "src/interfaces/IAnimalRepository";
import { Animal } from "src/domain/Animal";
import { Cliente } from "src/domain/Cliente";

export class AnimalService{
    private animalRepository: IAnimalRepository;

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

}