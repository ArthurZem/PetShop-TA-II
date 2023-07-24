import { ServicoRepository } from '../../src/repositories/ServicoRepository'
import { ServicoService } from '../../src/application/ServicoService'
import {ServicoController} from '../../src/controllers/ServicoController'
import { Request, Response } from "express";

describe("ServicoController", () => {
    const mockServicoService: any = {
      criarServico: jest.fn().mockResolvedValue({
        id: 1,
        nome: "Teste",
        preco: "R$50,00",
      }),
    };

    const servicoController = new ServicoController(mockServicoService)


    it("deve falhar ao criar um Serviço", async()=>{
        const mockRequest: Partial<Request> ={
            body:{
                id:1,
                nome: "Teste",
                preco: "R$50,00",
            }
        }
        const mockResult: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };

          mockServicoService.criarServico.mockRejectedValue(new Error("Erro ao criar Serviço."));
          
          await servicoController.criarServico(mockRequest as Request, mockResult as Response);

          expect(mockServicoService.criarServico).toHaveBeenCalledWith(
            1,
            "Teste",
            "R$50,00",
          );

        expect(mockResult.status).toHaveBeenCalledWith(500);
        expect(mockResult.json).toHaveBeenCalledWith({ error:"Erro ao criar Serviço."});
 
    })
});