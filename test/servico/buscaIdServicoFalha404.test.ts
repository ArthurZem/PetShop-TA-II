import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";

describe("ServicoController", ()=>{
    const mockServicoService: any = {
        findById: jest.fn().mockResolvedValue(undefined),
    };

    const servicoController = new ServicoController(mockServicoService)

    it("deve buscar um Serviço por Id e falhar com erro 404",async () => {
        const mockRequest: Partial<Request> = {
            params: {
                id: "1",
            },
        };

        const mockResult: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await servicoController.findById(mockRequest as Request, mockResult as Response);

        expect(mockServicoService.findById).toHaveBeenCalledWith(1);

        expect(mockResult.status).toBeCalledWith(404);
        expect(mockResult.json).toHaveBeenCalledWith({ error: "Serviço não encontrado." });

    })
})