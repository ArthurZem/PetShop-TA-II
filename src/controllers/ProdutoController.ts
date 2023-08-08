import { Request,Response } from "express";
import { ProdutoService } from "src/application/ProdutoService";

export class ProdutoController {
    private produtoService: ProdutoService;

    constructor(produtoService: ProdutoService){
        this.produtoService = produtoService;
    }

    public async criarProduto(req: Request, res: Response): Promise<void>{
        try{
            const { id, nome, preco, estoque} = req.body;

            const produto = await this.produtoService.criarProduto(id, nome, preco, estoque);

            res.status(201).json(produto);
        }catch(error){
            res.status(500).json({error: 'Erro ao criar Produto.'})
        }
    }

    public async findById(req: Request, res: Response): Promise<void>{
        try{
            const ProdutoId = Number(req.params.id);

            const Produto = await this.produtoService.findById(ProdutoId);
         
            if(Produto){
                res.status(200).json(Produto)
            }
            else{
                res.status(404).json({error: 'Produto não encontrado.'})
            }
        } catch(error){
            res.status(500).json({ error:'Erro ao tentar obter Produto.'})
        }
    }

    public async listarProdutos(req: Request, res: Response): Promise<void> {
        try {
          const produtos = await this.produtoService.listarProdutos();
          res.json(produtos);
        } catch (error) {
          res.status(500).json({ message: "Erro ao listar produtos" });
        }
      }

    public async delete(req: Request, res: Response): Promise<void> {
        const produtoId = Number(req.params.id);
    
        try {
            const produto = await this.produtoService.findById(produtoId);
    
            if (produto) {
                await this.produtoService.delete(produto);
                res.status(204).send();
            } else {
                res.status(404).json({ error: "produto não encontrado." });
            }
        } catch (error) {
            res.status(500).json({ error: "Erro ao tentar deletar o produto." });
        }
    }
}