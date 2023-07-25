import { Request,Response } from "express";
import { AnimalService } from "src/application/AnimalService";
import { Animal } from "src/domain/Animal";

export class AnimalController {
    private animalService: AnimalService;
    private animais: Animal[];

    constructor(animalService: AnimalService){
        this.animalService = animalService;
    }

    public async CriarAnimal(req: Request, res: Response): Promise<void>{
        try{
            const { id, nome, especie, raca, idade, dono} = req.body;

            const animal = await this.animalService.criarAnimal(id, nome, especie, raca, idade, dono);

            res.status(201).json(animal);
        }catch(error){
            res.status(500).json({error: 'Erro ao criar animal.'})
        }
    }

    public async findById(req: Request, res: Response): Promise<void>{
        try{
            const animalId = Number(req.params.id);

            const animal = await this.animalService.findById(animalId);
         
            if(animal){
                res.status(200).json(animal)
            }
            else{
                res.status(404).json({error: 'Animal não encontrado.'})
            }
        } catch(error){
            res.status(500).json({ error:'Erro ao tentar obter animal.'})
        }
    }

    public async findByEspecie(req: Request, res: Response): Promise<void>{
        try{
            const especie = String(req.params.especie);

            const animal = await this.animalService.findByEspecie(especie);
         
            if(animal){
                res.status(200).json(animal)
            }
            else{
                res.status(404).json({error: 'Espécie não encontrada.'})
            }
        } catch(error){
            res.status(500).json({ error:'Erro ao tentar obter espécie.'})
        }
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const animalId = Number(req.params.id);

        try {
            const animal = await this.animalService.findById(animalId);

            if (animal) {
                await this.animalService.delete(animal);
                res.status(204).send(); // Retorna o status 204 sem conteúdo
            } else {
                res.status(404).json({ error: "Animal não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao tentar deletar o animal." });
        }
    }
}