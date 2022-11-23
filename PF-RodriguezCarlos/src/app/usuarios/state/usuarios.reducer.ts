import { Action, createReducer, on } from '@ngrx/store';
import { I_UsuarioState } from '../models/usuario.state';
import * as UsuariosActions from './usuarios.actions';

export const usuariosFeatureKey = 'usuarios';

export const estadoInicial: I_UsuarioState = {
  cargando: false,
  usuarios: [],
};

export const usuariosReducer = createReducer(
  estadoInicial,

  on(UsuariosActions.cargarUsuarios, (state) => {
    return { ...state, cargando: true };
  }),
  on(UsuariosActions.usuariosCargados, (state, { usuarios }) => {
    return { ...state, cargando: false, usuarios: usuarios };
  }),
  on(UsuariosActions.agregarUsuario, (state, { usuario }) => {
    return state;
  }),
  on(UsuariosActions.editarUsuario, (state, { usuario }) => {
    return state;
  }),
  on(UsuariosActions.eliminarUsuario, (state, { id }) => {
    return state;
  })
);
