import { AnimalController } from "../../src/controllers/AnimalController";
import { Animal } from "../../src/domain/Animal";
import { Cliente } from "../../src/domain/Cliente";
import { Request, Response } from "express";

describe("AnimalController", () => {
    let mockAnimalService: any;
    let animalController: AnimalController;

    beforeEach(() => {
        mockAnimalService = {
            findById: jest.fn().mockResolvedValue(undefined),
            delete: jest.fn().mockResolvedValue(undefined),
        };
        animalController = new AnimalController(mockAnimalService);
    });

    describe("delete", () => {
        it("deve deletar o animal com sucesso", async () => {
            const animalId = 1;

            const mockAnimal: Animal = new Animal(1, "Rex", "Cachorro", "Labrador", 2, new Cliente(1, "João", "(11) 99999-9999", "Rua A"));
            mockAnimalService.findById.mockResolvedValue(mockAnimal);

            const mockRequest: Partial<Request> = {
                params: {
                    id: String(animalId),
                },
            };

            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                send: jest.fn(),
            };

            await animalController.delete(mockRequest as Request, mockResponse as Response);

            expect(mockAnimalService.findById).toHaveBeenCalledWith(animalId);

            expect(mockResponse.status).toHaveBeenCalledWith(204);
            expect(mockResponse.send).toHaveBeenCalled();
        });
        });

        it("deve retornar um erro 404 se o animal não for encontrado", async () => {
            const animalId = 1;

            mockAnimalService.findById.mockResolvedValue(undefined);

            const mockRequest: Partial<Request> = {
                params: {
                    id: String(animalId),
                },
            };

            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await animalController.delete(mockRequest as Request, mockResponse as Response);

            expect(mockAnimalService.findById).toHaveBeenCalledWith(animalId);

            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: "Animal não encontrado." });
        });

        it("deve retornar um erro 500 se ocorrer um erro ao tentar deletar o animal", async () => {
            const animalId = 1;

            mockAnimalService.findById.mockResolvedValue(new Animal(1, "Rex", "Cachorro", "Labrador", 2, new Cliente(1, "João", "(11) 99999-9999", "Rua A")));
            mockAnimalService.delete.mockRejectedValue(new Error("Erro ao tentar deletar o animal."));

            const mockRequest: Partial<Request> = {
                params: {
                    id: String(animalId),
                },
            };

            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await animalController.delete(mockRequest as Request, mockResponse as Response);

            expect(mockAnimalService.findById).toHaveBeenCalledWith(animalId);

            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: "Erro ao tentar deletar o animal." });
        });
    });