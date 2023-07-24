import { Request, Response } from "express";
import { AnimalController } from "../../src/controllers/AnimalController";
import { Animal } from "../../src/domain/Animal";
import { Cliente } from "../../src/domain/Cliente";

describe("AnimalController", () => {
    let mockAnimalService: any;
    let animalController: AnimalController;

    beforeEach(() => {
        // Cria um mock do AnimalService
        mockAnimalService = {
            criarAnimal: jest.fn(),
            findById: jest.fn().mockResolvedValue(undefined),
        };
        // Cria uma instância do AnimalController com o mock do AnimalService
        animalController = new AnimalController(mockAnimalService);
    });

    describe("CriarAnimal", () => {
        it("deve criar um animal com dados válidos", async () => {
            // Cria um mock da requisição com dados válidos
            const mockRequest: Partial<Request> = {
                body: {
                    id: 1,
                    nome: "Rex",
                    especie: "Cachorro",
                    raca: "Labrador",
                    idade: 2,
                    dono: new Cliente(1, "João", "(11) 99999-9999", "Rua A"),
                },
            };
            // Cria um mock da resposta
            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockAnimal: Animal = new Animal(1, "Rex", "Cachorro", "Labrador", 2, new Cliente(1, "João", "(11) 99999-9999", "Rua A"));
            mockAnimalService.criarAnimal.mockResolvedValue(mockAnimal);

            await animalController.CriarAnimal(mockRequest as Request, mockResponse as Response);

            expect(mockAnimalService.criarAnimal).toHaveBeenCalledWith(
                1,
                "Rex",
                "Cachorro",
                "Labrador",
                2,
                expect.any(Cliente)
            );

            expect(mockResponse.status).toBeCalledWith(201);
            expect(mockResponse.json).toHaveBeenCalledWith(mockAnimal);
        });

        it("deve retornar um erro 500 com dados inválidos", async () => {
            // Cria um mock da requisição com dados inválidos (não é fornecido o dono)
            const mockRequest: Partial<Request> = {
                body: {
                    id: 1,
                    nome: "Rex",
                    especie: "Cachorro",
                    raca: "Labrador",
                    idade: 2,
                    // dono: new Cliente(1, "João", "(11) 99999-9999", "Rua A"),
                },
            };
            // Cria um mock da resposta
            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            // Configura o mock do AnimalService para lançar um erro (simulando uma falha na criação do animal)
            mockAnimalService.criarAnimal.mockRejectedValue(new Error("Erro ao criar animal."));

            // Chama o método criarAnimal do AnimalController
            await animalController.CriarAnimal(mockRequest as Request, mockResponse as Response);

            // Verifica se a resposta da requisição é um erro 500, como esperado
            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: "Erro ao criar animal." });
        });
    });
});
