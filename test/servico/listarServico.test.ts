import { Request, Response } from "express";
import { ServicoController } from "../../src/controllers/ServicoController";
import { ServicoService } from "../../src/application/ServicoService";

const mockServicoService: any = {
  listarServicos: jest.fn().mockResolvedValue([
    { id: 1, nome: "Banho e Tosa", preco: 50 },
    { id: 2, nome: "Consulta Veterinária", preco: 100 },
  ]),
};

const servicoController = new ServicoController(mockServicoService);

describe("ServicoController - listarServicos", () => {
  it("deve retornar uma lista de serviços com sucesso", async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn(),
    };

    await servicoController.listarServicos(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockServicoService.listarServicos).toHaveBeenCalled();

    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, nome: "Banho e Tosa", preco: 50 },
      { id: 2, nome: "Consulta Veterinária", preco: 100 },
    ]);
  });

  it("deve retornar um erro 500 ao listar serviços", async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockServicoService.listarServicos.mockRejectedValue(new Error("Erro ao listar Serviços"));

    await servicoController.listarServicos(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockServicoService.listarServicos).toHaveBeenCalled();

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Erro ao listar Serviços",
    });
  });
});
