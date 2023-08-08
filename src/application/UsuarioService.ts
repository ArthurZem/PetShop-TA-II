import { Usuario } from "../domain/Usuario";
import { IUsuarioRepository } from "../interfaces/IUsuarioRepository";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UsuarioService {
  private usuarioRepository: IUsuarioRepository;

  constructor(usuarioRepository: IUsuarioRepository) {
    this.usuarioRepository = usuarioRepository;
  }

  public async criarUsuario(id: number, login: string, password: string): Promise<void> {
    const usuario = new Usuario(id, login, password);
    await this.usuarioRepository.criarUsuario(usuario);
  }

  public async login(login: string, password: string): Promise<string | null> {
    const usuario = await this.usuarioRepository.login(login, password);
    if (!usuario) return null;

    const token = this.generateToken(usuario.id, usuario.login);
    return token;
  }

  private generateToken(id: number, login: string): string {
    const payload = {
      id: id,
      login: login,
    };

    const options = {
      expiresIn: "1h",
    };

    return jwt.sign(payload, process.env.JWT_SECRET || "", options);
  }
}
