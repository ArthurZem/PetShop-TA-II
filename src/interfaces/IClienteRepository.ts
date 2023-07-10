import { Cliente } from '../domain/Cliente';

export interface IClienteRepository {
  findById(id: number): Promise<Cliente | null>;
  findByNome(nome: string): Promise<Cliente[]>;
  save(cliente: Cliente): Promise<void>;
  delete(cliente: Cliente): Promise<void>;
}
