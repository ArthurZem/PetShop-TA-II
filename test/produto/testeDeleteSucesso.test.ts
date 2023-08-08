import { Request, Response } from "express";
import { ProdutoController } from "../../src/controllers/ProdutoController";

describe("ProdutoController", () => {
  const mockProdutoService: any = {
    findById: jest.fn(),
    delete: jest.fn(),
  };

  const produtoController = new ProdutoController(mockProdutoService);

  it("deve deletar um produto por Id e retornar 204", async () => {
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

    const mockProduto = { id: 1, nome: "Produto Teste", preco: "100" };
    mockProdutoService.findById.mockResolvedValue(mockProduto);

    await produtoController.delete(mockRequest as Request, mockResult as Response);

    expect(mockProdutoService.findById).toHaveBeenCalledWith(1);
    expect(mockProdutoService.delete).toHaveBeenCalledWith(mockProduto);
    expect(mockResult.status).toBeCalledWith(204);
    expect(mockResult.send).toBeCalled();
    expect(mockResult.json).not.toHaveBeenCalled();
  });
});
