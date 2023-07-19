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
});
