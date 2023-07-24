import { ProdutoRepository } from '../../src/repositories/ProdutoRepository'
import { ProdutoService } from '../../src/application/ProdutoService'
import {ProdutoController} from '../../src/controllers/ProdutoController'
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


    it("deve falhar ao criar um Produto", async()=>{
        const mockRequest: Partial<Request> ={
            body:{
                id:1,
                nome: "Teste",
                preco: "R$50,00",
                estoque: 2
            }
        }
        const mockResult: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
          };

          mockProdutoService.criarProduto.mockRejectedValue(new Error("Erro ao criar Produto."));
          
          await produtoController.criarProduto(mockRequest as Request, mockResult as Response);

          expect(mockProdutoService.criarProduto).toHaveBeenCalledWith(
            1,
            "Teste",
            "R$50,00",
            2
          );

        expect(mockResult.status).toHaveBeenCalledWith(500);
        expect(mockResult.json).toHaveBeenCalledWith({ error:"Erro ao criar Produto."});
 
    })
});