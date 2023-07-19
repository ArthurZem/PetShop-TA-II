import { ProdutoService } from "../src/application/ProdutoService";
import { ProdutoController } from "../src/controllers/ProdutoController";
import {ProdutoRepository} from "../src/repositories/ProdutoRepository";
import { Produto } from "../src/domain/Produto";

describe('Produto', () => {
  describe('Produto Model', () => {
    it('deve criar um produto com os atributos corretos', () => {
      const id = 1;
      const nome = 'Ração para Cães';
      const preco = 50.99;
      const estoque = 100;

      const produto = new Produto(id, nome, preco, estoque);

      expect(produto.id).toEqual(id);
      expect(produto.nome).toEqual(nome);
      expect(produto.preco).toEqual(preco);
      expect(produto.estoque).toEqual(estoque);
    });
  });

  describe('Produto Service', () => {
    let produtoService: ProdutoService;
    const produtoRepository = new ProdutoRepository();

    beforeEach(() => {
      produtoService = new ProdutoService(produtoRepository);
    });

    it('deve criar um produto corretamente', async () => {
      const id = 1;
      const nome = 'Ração para Cães';
      const preco = 50.99;
      const estoque = 100;

      const produto = await produtoService.criarProduto(id, nome, preco, estoque);

      expect(produto.id).toEqual(id);
      expect(produto.nome).toEqual(nome);
      expect(produto.preco).toEqual(preco);
      expect(produto.estoque).toEqual(estoque);
    });

  });

  describe('Produto Controller', () => {
    let produtoController: ProdutoController;
    let mockResponse: any;

    beforeEach(() => {
      mockResponse = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis(),
      };
      const mockProdutoService: any = {
        criarProduto: jest.fn().mockResolvedValue(new Produto(1, 'Ração para Cães', 50.99, 100)),
        listarProdutos: jest.fn().mockResolvedValue([
          new Produto(1, 'Ração para Cães', 50.99, 100),
          new Produto(2, 'Petisco para Gatos', 20.50, 50),
        ]),
        encontrarProdutoPorId: jest.fn().mockResolvedValue(new Produto(1, 'Ração para Cães', 50.99, 100)),
      };
      produtoController = new ProdutoController(mockProdutoService);
    });

    it('deve criar um produto com sucesso', async () => {
      const req: any = {
        body: {
          id: 1,
          nome: 'Ração para Cães',
          preco: 50.99,
          estoque: 100,
        },
      };

      await produtoController.criarProduto(req, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: 1,
        nome: 'Ração para Cães',
        preco: 50.99,
        estoque: 100,
      });
    });

  });
});
