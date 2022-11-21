import { createAction, props } from '@ngrx/store';
import { I_Usuario } from 'src/app/usuarios/models/usuario';

export const cargarSesion = createAction('[Sesion] Cargar Sesion');

export const cargarUsuarioActivo = createAction(
  '[Sesion] Cargar Usuario Activo',
  props<{ usuarioActivo: I_Usuario }>()
);

export const cargarMenuActivo = createAction(
  '[Sesion] Cargar Menu Activo',
  props<{ menuActivo: string }>()
);

export const borrarSession = createAction('[Sesion] Borrar Sesion');
