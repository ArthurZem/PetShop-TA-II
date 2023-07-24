import { IServicoRepository } from "../interfaces/IServicoRepository";
import { Servico } from "../domain/Servico";

export class ServicoRepository implements IServicoRepository {
  private Servicos: Servico[];

  constructor() {
    this.Servicos = [];
  }
  public async findByName(nome: string): Promise<Servico[]> {
    const ServicosEncontrados = this.Servicos.filter((Servico) =>
      Servico.nome.toLowerCase().includes(nome.toLowerCase())
    );
    return ServicosEncontrados;
  }
  public async findAll(): Promise<Servico[]> {
    return this.Servicos;
  }

  public async findById(id: number): Promise<Servico | null> {
    const Servico = this.Servicos.find((p) => p.id === id);
    return Servico || null;
  }

  public async save(Servico: Servico): Promise<void> {
    const index = this.Servicos.findIndex((p) => p.id === Servico.id);
    if (index === -1) {
      this.Servicos.push(Servico);
    } else {
      this.Servicos[index] = Servico;
    }
  }

  public async delete(Servico: Servico): Promise<void> {
    const index = this.Servicos.findIndex((p) => p.id === Servico.id);
    if (index !== -1) {
      this.Servicos.splice(index, 1);
    }
  }
}
