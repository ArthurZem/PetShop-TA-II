import { Request, Response } from "express";
import { ProdutoController } from "../../src/controllers/ProdutoController";
import { ProdutoService } from "../../src/application/ProdutoService";

const mockProdutoService: any = {
  listarProdutos: jest.fn().mockResolvedValue([
    { id: 1, nome: "Ração", preco: 50 },
    { id: 2, nome: "Coleira", preco: 20 },
  ]),
};

const produtoController = new ProdutoController(mockProdutoService);

describe("ProdutoController - listarProdutos", () => {
  it("deve retornar um erro 500 ao listar produtos", async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockProdutoService.listarProdutos.mockRejectedValue(new Error("Erro ao listar Produtos"));

    await produtoController.listarProdutos(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockProdutoService.listarProdutos).toHaveBeenCalled();

    expect(mockResponse.status).toHaveBeenCalledWith(500);

    expect(mockResponse.json).toHaveBeenCalledWith({
      message: "Erro ao listar produtos",
    });
  });
});
