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
        // criação de instância
        const animal = new Animal(id,nome,especie,raca,idade,dono);
        // salvar cliente no repositório
        await this.animalRepository.save(animal);

        return animal;
    }

    public async findById(id:number): Promise<Animal | null> {
        const animal = await this.animalRepository.findById(id);

        return animal;
    }
    
    public async findByName(nome:string) : Promise<Animal[]>{
        const animal = await this.animalRepository.findByNome(nome);

        return animal;
    }
}