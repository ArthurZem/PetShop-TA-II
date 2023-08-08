import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";

describe("ServicoController", () => {
  const mockServicoService: any = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const servicoController = new ServicoController(mockServicoService);


  it("deve retornar erro 404 se o Serviço não for encontrado", async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: "1",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockServicoService.findById.mockResolvedValue(null);

    await servicoController.delete(mockRequest as Request, mockResult as Response);

    expect(mockServicoService.findById).toHaveBeenCalledWith(1);
    expect(mockServicoService.delete).not.toHaveBeenCalled();
    expect(mockResult.status).toBeCalledWith(404);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "serviço não encontrado." });
  });

});
