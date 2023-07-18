import {Produto} from '../domain/Produto'

export interface IProdutoRepository {
  findById(id: number): Promise<Produto | null>;
  findByNome(nome: string): Promise<Produto[]>;
  save(cliente: Produto): Promise<void>;
  delete(cliente: Produto): Promise<void>;
}
