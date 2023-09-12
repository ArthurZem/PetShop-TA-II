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
    try{
      const usuario = await this.usuarioRepository.login(login, password);
      if(usuario){
        const token = jwt.sign({id: usuario.id, login: usuario.login}, 'secret' , {expiresIn: '1h'});
        return token;
      }
      else{
        return null;
      }
    }catch(error){
      throw new Error('Erro ao realizar login');
    }
  }
}
