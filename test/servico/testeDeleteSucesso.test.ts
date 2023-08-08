import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";

describe("ServicoController", () => {
  const mockServicoService: any = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const servicoController = new ServicoController(mockServicoService);

  it("deve deletar um Serviço por Id e retornar 204", async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: "1",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    const mockServico = { id: 1, nome: "Serviço Teste", preco: "100" };
    mockServicoService.findById.mockResolvedValue(mockServico);

    await servicoController.delete(mockRequest as Request, mockResult as Response);

    expect(mockServicoService.findById).toHaveBeenCalledWith(1);
    expect(mockServicoService.delete).toHaveBeenCalledWith(mockServico);
    expect(mockResult.status).toBeCalledWith(204);
    expect(mockResult.send).toBeCalled();
    expect(mockResult.json).not.toHaveBeenCalled();
  });
});
