import { Request, Response } from "express";
import { ProdutoController } from "../../src/controllers/ProdutoController";

describe("ProdutoController", ()=>{
    const mockProdutoService: any = {
        findById: jest.fn().mockResolvedValue(undefined),
    };

    const produtoController = new ProdutoController(mockProdutoService)

    it("deve buscar um Produto por Id e falhar com erro 404",async () => {
        const mockRequest: Partial<Request> = {
            params: {
                id: "1",
            },
        };

        const mockResult: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await produtoController.findById(mockRequest as Request, mockResult as Response);

        expect(mockProdutoService.findById).toHaveBeenCalledWith(1);

        expect(mockResult.status).toBeCalledWith(404);
        expect(mockResult.json).toHaveBeenCalledWith({ error: "Produto não encontrado." });

    })
})