import { I_Usuario } from './usuario';

export interface I_UsuarioState {
  cargando: boolean;
  usuarios: I_Usuario[];
}
