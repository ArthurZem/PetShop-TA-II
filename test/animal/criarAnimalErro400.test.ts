import { Request, Response } from "express";
import { AnimalController } from "../../src/controllers/AnimalController";
import { AnimalService } from "../../src/application/AnimalService";

const mockAnimalService: any = {
  criarAnimal: jest.fn().mockResolvedValue(null), // Simulando falha ao criar o animal
};

const animalController = new AnimalController(mockAnimalService);

describe("AnimalController - criarAnimal", () => {
  it("deve retornar erro 400 em caso de falha ao criar o Animal", async () => {
    const mockRequest: Partial<Request> = {
      body: {
        id: 1,
        nome: "Rex",
        especie: "Cachorro",
        raca: "Vira-lata",
        idade: 3,
        dono: "João",
      },
    };

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.criarAnimal(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: "Erro ao criar animal." });
  });
});
