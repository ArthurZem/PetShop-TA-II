import { Usuario } from '../domain/Usuario';

export interface IUsuarioRepository {
  criarUsuario(usuario: Usuario): Promise<void>;
  login(login: string, password: string): Promise<Usuario | null>;
}
