import { Request, Response } from "express";
import { ServicoService } from "../application/ServicoService";
import { Servico } from "../domain/Servico";
import { ServicoRepository } from "src/repositories/ServicoRepository";

export class ServicoController {
  private servicoService: ServicoService;

  constructor(ServicoService: ServicoService) {
    this.servicoService = ServicoService;
  }
  

  public async criarServico(req: Request, res: Response): Promise<void>{
    try{
        const { id, nome, preco, estoque} = req.body;

        const servico = await this.servicoService.criarServico(id, nome, preco);

        res.status(201).json(servico);
    }catch(error){
        res.status(500).json({error: 'Erro ao criar Serviço.'})
    }
  }

  public async listarServicos(req: Request, res: Response): Promise<void> {
    try {
      const Servicos = await this.servicoService.listarServicos();
      res.json(Servicos);
    } catch (error) {
      res.status(500).json({ message: "Erro ao listar Serviços" });
    }
  }

  public async findById(req: Request, res: Response): Promise<void>{
    try{
        const servicoId = Number(req.params.id);

        const servico = await this.servicoService.findById(servicoId);
     
        if(servico){
            res.status(200).json(servico)
        }
        else{
            res.status(404).json({error: 'Serviço não encontrado.'})
        }
    } catch(error){
        res.status(500).json({ error:'Erro ao tentar obter Serviço.'})
    }
}
}

