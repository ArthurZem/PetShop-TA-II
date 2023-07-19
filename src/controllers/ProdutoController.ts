import { Request, Response } from "express";
import { ProdutoService } from "../application/ProdutoService";
import { Produto } from "../domain/Produto";
import { ProdutoRepository } from "src/repositories/ProdutoRepository";

export class ProdutoController {
  private produtoService: ProdutoService;

  constructor(produtoService: ProdutoService) {
    this.produtoService = produtoService;
  }
  

  public async criarProduto(req: Request, res: Response): Promise<void> {
    const { id, nome, preco, estoque } = req.body;
    try {
      const produto = await this.produtoService.criarProduto(id,nome, preco, estoque);
      res.status(201).json(produto);
    } catch (error) {
      console.log('Erro ao criar produto.', error);
      if(error instanceof Error){
        res.status(400).json({message: `Erro ao criar produto: ${error.message}`})
      }else{
        res.status(500).json({message: `Erro interno no servidor`})
      }
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

  public async encontrarProdutoPorId(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    try {
      const produtoId = parseInt(id, 10);
      const produto = await this.produtoService.encontrarProdutoPorId(produtoId);
      if (produto) {
        res.json(produto);
      } else {
        res.status(404).json({ message: "Produto não encontrado" });
      }
    } catch (error) {
      res.status(400).json({ message: "ID de produto inválido" });
    }
  }
}

const produtoRepository = new ProdutoRepository();
const produtoService = new ProdutoService(produtoRepository);
const produtoController = new ProdutoController(produtoService);

