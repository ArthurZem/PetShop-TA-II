import { Request, Response } from 'express';
import { AnimalController } from '../../src/controllers/AnimalController';

describe('AnimalController - criarAnimal', () => {
  const mockAnimalService: any = {
    criarAnimal: jest.fn(),
  };

  const animalController = new AnimalController(mockAnimalService);

  it('deve criar um Animal com sucesso', async () => {
    const mockRequest: Partial<Request> = {
      body: {
        id: 1,
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'Golden Retriever',
        idade: 2,
        dono: 'João',
      },
    };

    const animalMock = { id: 1, nome: 'Rex', especie: 'Cachorro' };
    mockAnimalService.criarAnimal.mockResolvedValue(animalMock);

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.criarAnimal(mockRequest as Request, mockResponse as Response);

    expect(mockAnimalService.criarAnimal).toHaveBeenCalledWith(
      1,
      'Rex',
      'Cachorro',
      'Golden Retriever',
      2,
      'João'
    );

    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.json).toHaveBeenCalledWith(animalMock);
  });

  it('deve retornar um erro 400 para campos obrigatórios não preenchidos', async () => {
    const mockRequest: Partial<Request> = {
      body: {
        nome: 'Rex',
        raca: 'Golden Retriever',
        idade: 2,
      },
    };

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.criarAnimal(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Dados inválidos.' });
  });

  it('deve retornar um erro 500 em caso de falha ao criar o Animal', async () => {
    const mockRequest: Partial<Request> = {
      body: {
        id: 1,
        nome: 'Rex',
        especie: 'Cachorro',
        raca: 'Golden Retriever',
        idade: 2,
        dono: 'João',
      },
    };

    mockAnimalService.criarAnimal.mockRejectedValue(new Error('Erro ao criar Animal'));

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.criarAnimal(mockRequest as Request, mockResponse as Response);

    expect(mockAnimalService.criarAnimal).toHaveBeenCalledWith(
      1,
      'Rex',
      'Cachorro',
      'Golden Retriever',
      2,
      'João'
    );

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao criar animal.' });
  });
});
