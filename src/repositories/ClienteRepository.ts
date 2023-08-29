import { IClienteRepository } from 'src/interfaces/IClienteRepository';
import { Cliente } from 'src/domain/Cliente';
import { Animal } from 'src/domain/Animal';

export class ClienteRepository implements IClienteRepository {
  private clientes: Cliente[];
  private clienteRepository: IClienteRepository;

  constructor() {
    this.clientes = [];
  }
    findByNome(nome: string): Promise<Cliente[]> { 
      return new Promise( (resolve, reject)=>{
        const results = this.clientes.filter(cliente => cliente.nome === nome);
        resolve(results);
      });
    }

  public async findById(id: number): Promise<Cliente | null> {
    const cliente = this.clientes.find((c) => c.id === id);
    return cliente || null;
  }

  public async save(cliente: Cliente): Promise<void> {
    const index = this.clientes.findIndex((c) => c.id === cliente.id);

    if (index === -1) {
      this.clientes.push(cliente);
    } else {
      this.clientes[index] = cliente;
    }
  }

  public async delete(cliente: Cliente): Promise<void> {
    const index = this.clientes.findIndex((c) => c.id === cliente.id);

    if (index !== -1) {
      this.clientes.splice(index, 1);
    }
  }

  public async getAnimaisDoDono(donoId: number): Promise<Animal[]>{
    return this.clienteRepository.getAnimaisDoDono(donoId)
  }

  public async update(cliente: Cliente): Promise<void> {
    const index = this.clientes.findIndex((c) => c.id === cliente.id);

    if (index !== -1) {
      this.clientes[index] = cliente;
    }
  }

  public async getAll(): Promise<Cliente[]> {
    return this.clientes;
  }
}