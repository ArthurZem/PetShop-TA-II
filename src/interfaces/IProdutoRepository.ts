import {Produto} from '../domain/Produto'

export interface IProdutoRepository {
  findAll(): Produto[] | Promise<Produto[]>;
  findById(id: number): Promise<Produto | null>;
  findByName(nome: string): Promise<Produto[]>;
  save(cliente: Produto): Promise<void>;
  delete(cliente: Produto): Promise<void>;
  update(cliente: Produto): Promise<void>;
}
