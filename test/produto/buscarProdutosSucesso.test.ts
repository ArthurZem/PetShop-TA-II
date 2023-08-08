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
  it("deve retornar uma lista de produtos com sucesso", async () => {
    const mockRequest: Partial<Request> = {};
    const mockResponse: Partial<Response> = {
      json: jest.fn(),
    };

    await produtoController.listarProdutos(
      mockRequest as Request,
      mockResponse as Response
    );

    expect(mockProdutoService.listarProdutos).toHaveBeenCalled();

    expect(mockResponse.json).toHaveBeenCalledWith([
      { id: 1, nome: "Ração", preco: 50 },
      { id: 2, nome: "Coleira", preco: 20 },
    ]);
  });
});
