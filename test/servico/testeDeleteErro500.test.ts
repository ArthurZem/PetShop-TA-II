import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";

describe("ServicoController", () => {
  const mockServicoService: any = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const servicoController = new ServicoController(mockServicoService);

  it("deve retornar erro 500 se houver erro ao tentar deletar o Serviço", async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: "1",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockServicoService.findById.mockRejectedValue(new Error("Erro"));

    await servicoController.delete(mockRequest as Request, mockResult as Response);

    expect(mockServicoService.findById).toHaveBeenCalledWith(1);
    expect(mockServicoService.delete).not.toHaveBeenCalled();
    expect(mockResult.status).toBeCalledWith(500);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "Erro ao tentar deletar o serviço." });
  });
});
