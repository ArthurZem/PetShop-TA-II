import { Request, Response } from "express";
import { ClienteController } from "../../src/controllers/ClienteController";

describe("ClienteController", ()=>{
    const mockClienteService: any = {
        findById: jest.fn().mockRejectedValue(new Error("Erro interno no servidor")),
    };

    const clienteController = new ClienteController(mockClienteService)

    it("deve buscar um cliente por Id e falhar com erro 500",async () => {
        const mockRequest: Partial<Request> = {
            params: {
                id: "1",
            },
        };

        const mockResult: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await clienteController.findById(mockRequest as Request, mockResult as Response);

        expect(mockClienteService.findById).toHaveBeenCalledWith(1);

        expect(mockResult.status).toBeCalledWith(500);
        expect(mockResult.json).toHaveBeenCalledWith({error:' Erro ao tentar obter o cliente.'});

    })
})