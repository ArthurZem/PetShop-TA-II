import { IProdutoRepository } from "../interfaces/IProdutoRepository";
import { Produto } from "../domain/Produto";

export class ProdutoRepository implements IProdutoRepository {
  private produtos: Produto[];

  constructor() {
    this.produtos = [];
  }
  
  public async findByName(nome: string): Promise<Produto[]> {
    const produtosEncontrados = this.produtos.filter((produto) =>
      produto.nome.toLowerCase().includes(nome.toLowerCase())
    );
    return produtosEncontrados;
  }
  public async findAll(): Promise<Produto[]> {
    return this.produtos;
  }

  public async findById(id: number): Promise<Produto | null> {
    const produto = this.produtos.find((p) => p.id === id);
    return produto || null;
  }

  public async save(produto: Produto): Promise<void> {
    const index = this.produtos.findIndex((p) => p.id === produto.id);
    if (index === -1) {
      this.produtos.push(produto);
    } else {
      this.produtos[index] = produto;
    }
  }

  public async delete(produto: Produto): Promise<void> {
    const index = this.produtos.findIndex((p) => p.id === produto.id);
    if (index !== -1) {
      this.produtos.splice(index, 1);
    }
  }

  public async update(produto: Produto): Promise<void> {
    const index = this.produtos.findIndex((p) => p.id === produto.id);
    if (index !== -1) {
      this.produtos[index] = produto;
    }
  }
}
