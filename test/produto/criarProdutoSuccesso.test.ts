import { ProdutoController } from "../../src/controllers/ProdutoController";
import { Request, Response } from "express";

describe("ProdutoController", () => {
    const mockProdutoService: any = {
      criarProduto: jest.fn().mockResolvedValue({
        id: 1,
        nome: "Teste",
        preco: "R$50,00",
        estoque: 2
      }),
    };

    const produtoController = new ProdutoController(mockProdutoService)

    it("deve criar um Produto com sucesso",async () => {
        const mockRequest: Partial<Request> ={
            body:{
                id: 1,
                nome: "Teste",
                preco: "R$50,00",
                estoque: 2
            }
        };

        const mockResult: Partial<Response> ={
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await produtoController.criarProduto(mockRequest as Request, mockResult as Response);

        expect(mockProdutoService.criarProduto).toHaveBeenCalledWith(
            1,
            "Teste",
            "R$50,00",
            2
        );
        
        expect(mockResult.status).toHaveBeenCalledWith(201);
        expect(mockResult.json).toHaveBeenCalledWith({
            id: 1,
            nome: "Teste",
            preco: "R$50,00",
            estoque: 2
        });
    })
});