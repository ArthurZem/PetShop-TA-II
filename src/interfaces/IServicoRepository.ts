import {Servico} from '../domain/Servico'

export interface IServicoRepository {
  findAll(): Servico[] | Promise<Servico[]>;
  findById(id: number): Promise<Servico | null>;
  findByName(nome: string): Promise<Servico[]>;
  save(cliente: Servico): Promise<void>;
  delete(cliente: Servico): Promise<void>;
  update(cliente: Servico): Promise<void>;
}
