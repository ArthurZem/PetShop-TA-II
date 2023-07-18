import { Request, Response } from "express";
import { ClienteService } from "src/application/ClienteService";

export class ClienteController {
    private clienteService: ClienteService;

    constructor(clienteService: ClienteService){
        this.clienteService = clienteService;
    }

    public async CriarCliente(req: Request, res: Response): Promise<void>{
        try{
            const { id, nome, telefone, endereco } = req.body;

            const cliente = await this.clienteService.criarCliente(id, nome, telefone, endereco);

            res.status(201).json(cliente);
        }catch(error){
            res.status(500).json({error: 'Erro ao criar cliente.'})
        }
    }

    public async findById(req: Request, res: Response): Promise<void>{
        try{
            const clienteId = Number(req.params.id);

            const cliente = await this.clienteService.findById(clienteId);
         
            if(cliente){
                res.status(200).json(cliente)
            }
            else{
                res.status(404).json({error: 'Cliente não encontrado.'})
            }
        } catch(error){
            res.status(500).json({ error:' Erro ao tentar obter o cliente.'})
        }
    }
    
}