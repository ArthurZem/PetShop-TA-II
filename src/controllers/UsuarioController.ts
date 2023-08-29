import { Request, Response } from "express";
import { UsuarioService } from "../services/UsuarioService";

export class UsuarioController {
  private usuarioService: UsuarioService;

  constructor(usuarioService: UsuarioService) {
    this.usuarioService = usuarioService;
  }

  public async criarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const { id, login, password } = req.body;

      const usuario = await this.usuarioService.criarUsuario(id, login, password);

      res.status(201).json(usuario);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar Usuário.' });
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { login, password } = req.body;

      const token = await this.usuarioService.login(login, password);

      if (token) {
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Credenciais inválidas.' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Erro ao realizar login.' });
    }
  }
}