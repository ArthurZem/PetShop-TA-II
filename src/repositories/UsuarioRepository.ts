import { IUsuarioRepository } from "../interfaces/IUsuarioRepository";
import { Usuario } from "../domain/Usuario";
import bcrypt from "bcrypt";

export class UsuarioRepository implements IUsuarioRepository {
  private usuarios: Usuario[];

  constructor() {
    this.usuarios = [];
  }

  public async criarUsuario(usuario: Usuario): Promise<void> {
    // Verifica se o login já está cadastrado
    if (this.usuarios.some((u) => u.login === usuario.login)) {
      throw new Error("Login já cadastrado.");
    }

    // Encripta a senha antes de salvar o usuário
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(usuario.password, salt);

    // Salva o novo usuário com a senha encriptada
    this.usuarios.push({
      ...usuario,
      password: hash,
    });
  }

  public async login(login: string, password: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((u) => u.login === login);

    if (!usuario) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, usuario.password);
    if (!isPasswordValid) {
      return null;
    }

    return usuario;
  }
 
}
