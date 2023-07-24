import { Request, Response } from "express";
import { AnimalController } from "../../src/controllers/AnimalController";
import { AnimalService } from "../../src/application/AnimalService";
import { Animal } from "../../src/domain/Animal";
import { Cliente } from "../../src/domain/Cliente";

describe("AnimalController", () => {
    let mockAnimalService: any;
    let animalController: AnimalController;

    beforeEach(() => {
        mockAnimalService = {
            findById: jest.fn(),
        };
        animalController = new AnimalController(mockAnimalService);
    });

    describe("findById", () => {
        it("deve retornar o animal quando encontrado por ID", async () => {
            const mockRequest: Partial<Request> = {
                params: {
                    id: "1",
                },
            };
            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const mockAnimal: Animal = new Animal(1, "Rex", "Cachorro", "Labrador", 2, new Cliente(1, "João", "(11) 99999-9999", "Rua A"));
            mockAnimalService.findById.mockResolvedValue(mockAnimal);

            await animalController.findById(mockRequest as Request, mockResponse as Response);

            expect(mockAnimalService.findById).toHaveBeenCalledWith(1);

            expect(mockResponse.status).toBeCalledWith(200);
            expect(mockResponse.json).toHaveBeenCalledWith(mockAnimal);
        });

        it("deve retornar um erro 404 quando o animal não é encontrado", async () => {
            const mockRequest: Partial<Request> = {
                params: {
                    id: "999",
                },
            };
            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            mockAnimalService.findById.mockResolvedValue(undefined);

            await animalController.findById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toBeCalledWith(404);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: "Animal não encontrado." });
        });
        it("deve retornar um erro 500 ao tentar encontrar o animal", async()=>{
            const mockRequest: Partial<Request> = {
                params: {
                    id: "1",
                },
            };
            const mockResponse: Partial<Response> = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            mockAnimalService.findById.mockRejectedValue(new Error("Erro ao tentar obter animal."));
            await animalController.findById(mockRequest as Request, mockResponse as Response);

            expect(mockResponse.status).toBeCalledWith(500);
            expect(mockResponse.json).toHaveBeenCalledWith({ error: "Erro ao tentar obter animal." });
        })
    });
});
