import { ClienteRepository } from '../../src/repositories/ClienteRepository'
import { ClienteService } from '../../src/application/ClienteService'
import {ClienteController} from '../../src/controllers/ClienteController'
import { Request, Response } from "express";

describe("ClienteController", () => {
    const mockClienteService: any = {
      criarCliente: jest.fn().mockResolvedValue({
        id: 1,
        nome: "Teste",
        telefone: "(22)99999-9999",
        endereco: "rua teste"
      }),
    };

    const clienteController = new ClienteController(mockClienteService)


    it("deve falhar ao criar um cliente", async()=>{
        const mockRequest: Partial<Request> ={
            body:{
                id:1,
                nome: "Teste",
                telefone: "(22)99999-9999",
                endereco: "rua teste" 
            }
        }
        const mockResult: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };

          mockClienteService.criarCliente.mockRejectedValue(new Error("Erro ao criar cliente."));
          
          await clienteController.criarCliente(mockRequest as Request, mockResult as Response);

          expect(mockClienteService.criarCliente).toHaveBeenCalledWith(
            1,
            "Teste",
            "(22)99999-9999",
            "rua teste"
          );

        expect(mockResult.status).toHaveBeenCalledWith(500);
        expect(mockResult.json).toHaveBeenCalledWith({ error:"Erro ao criar cliente."});
 
    })
});