import { Servico } from "src/domain/Servico";
import { IServicoRepository } from "src/interfaces/IServicoRepository";

export class ServicoService {
  private ServicoRepository: IServicoRepository;

  constructor(ServicoRepository: IServicoRepository) {
    this.ServicoRepository = ServicoRepository;
  }

  public async criarServico(id: number, nome: string, preco: String): Promise<Servico> {
    const servico = new Servico(id, nome, preco);
    await this.ServicoRepository.save(servico);
    return servico;
  }

  public async listarServicos(): Promise<Servico[]> {
    return this.ServicoRepository.findAll();
  }

  public async findById(id: number): Promise<Servico | null> {
    return this.ServicoRepository.findById(id);
  }

}
