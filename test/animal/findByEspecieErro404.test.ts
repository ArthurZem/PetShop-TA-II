import { Request, Response } from "express";
import { AnimalController } from '../../src/controllers/AnimalController'
import { Animal } from "../../src/domain/Animal";
import { Cliente } from "../../src/domain/Cliente";

describe("AnimalController", () => {
    const mockAnimalService: any = {
        findByEspecie: jest.fn().mockResolvedValue([])
    };

    const animalController = new AnimalController(mockAnimalService);

    it('Deve retornar todos os animais de determinada espécie com falha 404 espécie não encontrada', async () => {
        const mockRequest: Partial<Request> = {
            params: {
                especie: "dinossauro",
            },
        };

        const mockResponse: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        
        const cliente =
            new Cliente(1,"Pedro", "(22)11111-1111", "Rua teste");

        const mockAnimais: Animal[] = [
            new Animal(1, "Rex", "Cachorro", "Labrador", 2, cliente),
            new Animal(2, "Luci", "Gato", "Siamês", 1, cliente),
            new Animal(2, "Teste", "Gato", "Siamês", 1, cliente),

        ]

        mockAnimalService.findByEspecie.mockResolvedValue(undefined)

        await animalController.findByEspecie(mockRequest as Request, mockResponse as Response)

        expect(mockResponse.status).toBeCalledWith(404)
        expect(mockResponse.json).toHaveBeenCalledWith({ error: "Espécie não encontrada." });
    });
});
