import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I_UsuarioState } from '../models/usuario.state';
import * as fromUsuarios from './usuarios.reducer';

export const selectUsuariosState = createFeatureSelector<I_UsuarioState>(
  fromUsuarios.usuariosFeatureKey
);

export const selectUsuariosCargando = createSelector(
  selectUsuariosState,
  (state) => state.cargando
);

export const selectUsuarios = createSelector(
  selectUsuariosState,
  (state) => state.usuarios
);
