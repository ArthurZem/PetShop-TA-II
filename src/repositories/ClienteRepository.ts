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
    // Busca um cliente pelo ID no array de clientes em memória
    const cliente = this.clientes.find((c) => c.id === id);
    return cliente || null;
  }

  public async save(cliente: Cliente): Promise<void> {
    // Adiciona ou atualiza um cliente no array de clientes em memória
    const index = this.clientes.findIndex((c) => c.id === cliente.id);

    if (index === -1) {
      // Se o cliente não existe, adiciona no array
      this.clientes.push(cliente);
    } else {
      // Se o cliente já existe, atualiza no array
      this.clientes[index] = cliente;
    }
  }

  public async delete(cliente: Cliente): Promise<void> {
    // Remove um cliente do array de clientes em memória
    const index = this.clientes.findIndex((c) => c.id === cliente.id);

    if (index !== -1) {
      // Se o cliente existe no array, remove
      this.clientes.splice(index, 1);
    }
  }

  public async getAnimaisDoDono(donoId: number): Promise<Animal[]>{
    return this.clienteRepository.getAnimaisDoDono(donoId)
  }
}