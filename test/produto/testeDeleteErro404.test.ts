import { Request, Response } from "express";
import { ProdutoController } from "../../src/controllers/ProdutoController";

describe("ProdutoController", () => {
  const mockProdutoService: any = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const produtoController = new ProdutoController(mockProdutoService);


  it("deve retornar erro 404 se o Produto não for encontrado", async () => {
    const mockRequest: Partial<Request> = {
      params: {
        id: "1",
      },
    };

    const mockResult: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockProdutoService.findById.mockResolvedValue(null);

    await produtoController.delete(mockRequest as Request, mockResult as Response);

    expect(mockProdutoService.findById).toHaveBeenCalledWith(1);
    expect(mockProdutoService.delete).not.toHaveBeenCalled();
    expect(mockResult.status).toBeCalledWith(404);
    expect(mockResult.json).toHaveBeenCalledWith({ error: "produto não encontrado." });
  });

});
