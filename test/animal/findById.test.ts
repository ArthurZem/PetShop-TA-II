import { Request, Response } from 'express';
import { AnimalController } from '../../src/controllers/AnimalController';

describe('AnimalController - findById', () => {
  const mockAnimalService: any = {
    findById: jest.fn(),
  };

  const animalController = new AnimalController(mockAnimalService);

  it('deve buscar um Animal por Id e retornar status 200 com o Animal', async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: '1',
      },
    };

    const animalMock = { id: 1, nome: 'Rex', especie: 'Cachorro' };
    mockAnimalService.findById.mockResolvedValue(animalMock);

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.findById(mockRequest as Request, mockResponse as Response);

    expect(mockAnimalService.findById).toHaveBeenCalledWith(1);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(animalMock);
  });

  it('deve retornar um erro 404 quando o Animal não for encontrado', async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: '1',
      },
    };

    mockAnimalService.findById.mockResolvedValue(undefined);

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.findById(mockRequest as Request, mockResponse as Response);

    expect(mockAnimalService.findById).toHaveBeenCalledWith(1);

    expect(mockResponse.status).toHaveBeenCalledWith(404);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Animal não encontrado.' });
  });

  it('deve retornar um erro 400 para id inválido', async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: '',
      },
    };

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.findById(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Id inválido.' });
  });

  it('deve retornar um erro 500 em caso de falha ao buscar o Animal', async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: '1',
      },
    };

    mockAnimalService.findById.mockRejectedValue(new Error('Erro ao buscar Animal'));

    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await animalController.findById(mockRequest as Request, mockResponse as Response);

    expect(mockAnimalService.findById).toHaveBeenCalledWith(1);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
    expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Erro ao tentar obter animal.' });
  });
});
