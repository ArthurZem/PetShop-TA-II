import { IClienteRepository } from "src/interfaces/IClienteRepository";
import { Animal } from "src/domain/Animal";
import {Cliente} from '../domain/Cliente'

export class ClienteService{
    private clienteRepository: IClienteRepository;
    private clientes: Cliente[];

    constructor(clienteRepository:IClienteRepository){
        this.clienteRepository = clienteRepository;
    }

    public async criarCliente(id: number, nome: string, telefone: string, endereco: string): Promise<Cliente>{
        const clienteExistente = await this.clienteRepository.findById(id);
        if(clienteExistente){
            throw new Error('ID já cadastrado para outro cliente.')
        }
        const cliente = new Cliente(id,nome,telefone,endereco);
        await this.clienteRepository.save(cliente);

        return cliente;
    }

    public async getAll(): Promise<Cliente[]> {
        return this.clienteRepository.getAll();
    }

    public async findById(id:number): Promise<Cliente | null> {
        const cliente = await this.clienteRepository.findById(id);

        return cliente;
    }
    
    public async findByName(nome:string) : Promise<Cliente[]>{
        const cliente = await this.clienteRepository.findByNome(nome);

        return cliente;
    }

    public async getAnimaisDoDono(donoId: number): Promise<Animal[]>{
        return this.clienteRepository.getAnimaisDoDono(donoId)
    }

    public async delete(cliente: Cliente): Promise<void> {
        const index = this.clientes.findIndex((c) => c.id === cliente.id);

        if (index !== -1) {
            this.clientes.splice(index, 1);
        }
    }

}