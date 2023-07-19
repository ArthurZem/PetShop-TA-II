import { ClienteController } from "../../src/controllers/ClienteController";
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

    it("deve criar um cliente com sucesso",async () => {
        const mockRequest: Partial<Request> ={
            body:{
                id: 1,
                nome: "Teste",
                telefone: "(22)99999-9999",
                endereco: "rua teste"
            }
        };

        const mockResult: Partial<Response> ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await clienteController.criarCliente(mockRequest as Request, mockResult as Response);

        expect(mockClienteService.criarCliente).toHaveBeenCalledWith(
            1,
            "Teste",
            "(22)99999-9999",
            "rua teste"
        );
        
        expect(mockResult.status).toHaveBeenCalledWith(201);
        expect(mockResult.json).toHaveBeenCalledWith({
            id: 1,
            nome: "Teste",
            telefone: "(22)99999-9999",
            endereco: "rua teste"
        });
    })
});