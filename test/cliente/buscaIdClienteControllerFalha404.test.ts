import { Request, Response } from "express";
import { ClienteController } from "../../src/controllers/ClienteController";

describe("ClienteController", ()=>{
    const mockClienteService: any = {
        findById: jest.fn().mockResolvedValue(undefined),
    };

    const clienteController = new ClienteController(mockClienteService)

    it("deve buscar um cliente por Id e falhar com erro 404",async () => {
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

        expect(mockResult.status).toBeCalledWith(404);
        expect(mockResult.json).toHaveBeenCalledWith({ error: "Cliente não encontrado." });

    })
})