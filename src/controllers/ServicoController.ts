import { Request, Response } from "express";
import { ServicoService } from "../application/ServicoService";
import { Servico } from "../domain/Servico";
import { ServicoRepository } from "src/repositories/ServicoRepository";

export class ServicoController {
  private servicoService: ServicoService;

  constructor(ServicoService: ServicoService) {
    this.servicoService = ServicoService;
  }
  

  public async criarServico(req: Request, res: Response): Promise<void> {
    const { id, nome, preco, estoque } = req.body;
    try {
      const Servico = await this.servicoService.criarServico(id,nome, preco);
      res.status(201).json(Servico);
    } catch (error) {
      console.log('Erro ao criar Servico.', error);
      if(error instanceof Error){
        res.status(400).json({message: `Erro ao criar Servico: ${error.message}`})
      }else{
        res.status(500).json({message: `Erro interno no servidor`})
      }
    }
  }

  public async listarServicos(req: Request, res: Response): Promise<void> {
    try {
      const Servicos = await this.servicoService.listarServicos();
      res.json(Servicos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar Servicos" });
    }
  }

  public async encontrarServicoPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const ServicoId = parseInt(id, 10);
      const Servico = await this.servicoService.encontrarServicoPorId(ServicoId);
      if (Servico) {
        res.json(Servico);
      } else {
        res.status(404).json({ message: "Servico não encontrado" });
      }
    } catch (error) {
      res.status(400).json({ message: "ID de Servico inválido" });
    }
  }
}

