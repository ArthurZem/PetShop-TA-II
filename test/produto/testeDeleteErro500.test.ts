import { Request, Response } from "express";
import { ProdutoController } from "../../src/controllers/ProdutoController";

describe("ProdutoController", () => {
  const mockProdutoService: any = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const produtoController = new ProdutoController(mockProdutoService);

  it("deve retornar erro 500 se houver erro ao tentar deletar o Produto", async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: "1",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockProdutoService.findById.mockRejectedValue(new Error("Erro"));

    await produtoController.delete(mockRequest as Request, mockResult as Response);

    expect(mockProdutoService.findById).toHaveBeenCalledWith(1);
    expect(mockProdutoService.delete).not.toHaveBeenCalled();
    expect(mockResult.status).toBeCalledWith(500);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "Erro ao tentar deletar o produto." });
  });
});
