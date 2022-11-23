import { createAction, props } from '@ngrx/store';
import { I_Usuario } from '../models/usuario';

export const cargarUsuarios = createAction('[Usuarios] Cargar Usuarios');

export const usuariosCargados = createAction(
  '[Usuarios] Usuarios cargados',
  props<{ usuarios: I_Usuario[] }>()
);

export const agregarUsuario = createAction(
  '[Usuarios] Agregar usuario',
  props<{ usuario: I_Usuario }>()
);

export const editarUsuario = createAction(
  '[Usuarios] Editar usuario',
  props<{ usuario: I_Usuario }>()
);

export const eliminarUsuario = createAction(
  '[Usuarios] Eliminar usuario',
  props<{ id: number }>()
);
