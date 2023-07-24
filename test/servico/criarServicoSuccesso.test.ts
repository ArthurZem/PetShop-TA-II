import { ServicoController } from "../../src/controllers/ServicoController";
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

    it("deve criar um Servico com sucesso",async () => {
        const mockRequest: Partial<Request> ={
            body:{
                id: 1,
                nome: "Teste",
                preco: "R$50,00",
            }
        };

        const mockResult: Partial<Response> ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await servicoController.criarServico(mockRequest as Request, mockResult as Response);

        expect(mockServicoService.criarServico).toHaveBeenCalledWith(
            1,
            "Teste",
            "R$50,00",
        );
        
        expect(mockResult.status).toHaveBeenCalledWith(201);
        expect(mockResult.json).toHaveBeenCalledWith({
            id: 1,
            nome: "Teste",
            preco: "R$50,00",
        });
    })
});