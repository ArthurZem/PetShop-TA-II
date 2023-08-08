import { IProdutoRepository } from "src/interfaces/IProdutoRepository";
import { Produto } from "src/domain/Produto";

export class ProdutoService {
  private produtoRepository: IProdutoRepository;

  constructor(produtoRepository: IProdutoRepository) {
    this.produtoRepository = produtoRepository;
  }

  public async criarProduto(id: number, nome: string, preco: String, estoque: number): Promise<Produto> {
    const produto = new Produto(id, nome, preco, estoque);
    await this.produtoRepository.save(produto);
    return produto;
  }

  public async listarProdutos(): Promise<Produto[]> {
    return this.produtoRepository.findAll();
  }

  public async findById(id: number): Promise<Produto | null> {
    return this.produtoRepository.findById(id);
  }

  public async delete(produto: Produto): Promise<void> {
    await this.produtoRepository.delete(produto);
  }

}
