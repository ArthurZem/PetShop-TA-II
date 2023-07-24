import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";

describe("ServicoController", ()=>{
    const mockServicoService: any = {
        findById: jest.fn().mockRejectedValue(Error("Erro ao tentar obter Servico.")),
    };

    const servicoController = new ServicoController(mockServicoService)

    it("deve buscar um Servico por Id e falhar com erro 500",async () => {
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

        expect(mockResult.status).toBeCalledWith(500);
        expect(mockResult.json).toHaveBeenCalledWith({ error: "Erro ao tentar obter Serviço." });

    })
})