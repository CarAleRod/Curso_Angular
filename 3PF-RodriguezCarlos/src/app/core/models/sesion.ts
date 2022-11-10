import { I_Usuario } from '../../usuarios/models/usuario';

export interface I_Sesion {
  sesionActiva: boolean;
  usuarioActivo?: I_Usuario;
  menuActivo?: string;
}
