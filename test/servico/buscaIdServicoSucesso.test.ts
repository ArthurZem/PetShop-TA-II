import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";

describe("ServicoController", ()=>{
    const mockServicoService: any = {
        findById: jest.fn().mockResolvedValue(1),
    };

    const servicoController = new ServicoController(mockServicoService)

    it("deve buscar um Servico por Id e ser bem sucedido",async () => {
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

        expect(mockResult.status).toBeCalledWith(200);
    })
})