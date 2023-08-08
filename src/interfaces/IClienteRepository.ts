import { Cliente } from '../domain/Cliente';
import { Animal } from 'src/domain/Animal';

export interface IClienteRepository {
  findById(id: number): Promise<Cliente | null>;
  findByNome(nome: string): Promise<Cliente[]>;
  save(cliente: Cliente): Promise<void>;
  delete(cliente: Cliente): Promise<void>;
  getAnimaisDoDono(clienteId: number): Promise<Animal[]>;
}