import { Action, createReducer, on } from '@ngrx/store';
import { I_Sesion } from '../models/sesion';
import * as SesionActions from './sesion.actions';

export const sesionFeatureKey = 'sesion';

export const estadoInicial: I_Sesion = {
  sesionActiva: false,
};

export const reducer = createReducer(
  estadoInicial,

  on(SesionActions.cargarSesion, (state) => state),
  on(SesionActions.cargarUsuarioActivo, (state, { usuarioActivo }) => {
    return { ...state, sesionActiva: true, usuarioActivo: usuarioActivo };
  }),
  on(SesionActions.cargarMenuActivo, (state, { menuActivo }) => {
    return { ...state, menuActivo: menuActivo };
  }),
  on(SesionActions.borrarSession, (state) => {
    return estadoInicial;
  })
);
