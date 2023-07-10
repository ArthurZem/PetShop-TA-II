import { IClienteRepository } from "src/interfaces/IClienteRepository";
import { Cliente } from "src/domain/Cliente";

class ClienteRepository implements IClienteRepository{
    findById(id: number): Promise<Cliente | null> {
        throw new Error("Method not implemented.");
    }
    findByNome(nome: string): Promise<Cliente[]> {
        throw new Error("Method not implemented.");
    }
    save(cliente: Cliente): Promise<void> {
        throw new Error("Method not implemented.");
    }
    delete(cliente: Cliente): Promise<void> {
        throw new Error("Method not implemented.");
    }
}