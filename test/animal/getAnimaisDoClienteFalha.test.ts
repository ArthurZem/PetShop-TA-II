import { Animal } from '../../src/domain/Animal';
import { Cliente } from '../../src/domain/Cliente';
import { ClienteController } from '../../src/controllers/ClienteController';
import { Request,Response } from 'express';

describe("ClienteController", () => {
  const mockClienteService: any = {
      findById: jest.fn().mockResolvedValue(undefined),
      getAnimaisDoDono: jest.fn().mockRejectedValue(new Error("Erro ao obter os animais do cliente.")),
  };

  const clienteController = new ClienteController(mockClienteService);

  it("deve retornar todos os animais de um cliente falhando com erro 500", async () => {
      const mockRequest: Partial<Request> = {
          params: {
              clienteId: "1",
          },
      };

      const mockResponse: Partial<Response> = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
      };

      const dono = new Cliente(1, "João", "(11) 99999-9999", "Rua A");
      
      const mockAnimais: Animal[] = [
          new Animal(1, "Rex", "Cachorro", "Labrador", 2, dono),
          new Animal(2, "Mimi", "Gato", "Siamês", 1, dono),
      ];

      await clienteController.getAnimaisDoCliente(mockRequest as Request, mockResponse as Response);

      expect(mockClienteService.getAnimaisDoDono).toHaveBeenCalledWith(1);

      expect(mockResponse.status).toBeCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({error: "Erro ao obter os animais do cliente."});
  });
});
