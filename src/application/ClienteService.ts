import { IClienteRepository } from "src/interfaces/IClienteRepository";
import { Cliente } from "src/domain/Cliente";

export class ClienteService{
    private clienteRepository: IClienteRepository;

    constructor(clienteRepository:IClienteRepository){
        this.clienteRepository = clienteRepository;
    }

    public async criarCliente(id: number, nome: string, telefone: string, endereco: string): Promise<Cliente>{
        const clienteExistente = await this.clienteRepository.findById(id);
        if(clienteExistente){
            throw new Error('ID já cadastrado para outro cliente.')
        }
        // criação de instância
        const cliente = new Cliente(id,nome,telefone,endereco);
        // salvar cliente no repositório
        await this.clienteRepository.save(cliente);

        return cliente;
    }

    public async obterCliente(clienteId: number): Promise<Cliente | null>{
        const cliente = await this.clienteRepository.findById(clienteId);

        return cliente;
    }
}