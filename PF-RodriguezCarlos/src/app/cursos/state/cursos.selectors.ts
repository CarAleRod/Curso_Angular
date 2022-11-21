import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I_CursoState } from '../models/curso.state';
import * as fromCursos from './cursos.reducer';

export const selectCursosState = createFeatureSelector<I_CursoState>(
  fromCursos.cursosFeatureKey
);

export const selectCursosCargando = createSelector(
  selectCursosState,
  (state) => state.cargando
);

export const selectCursos = createSelector(
  selectCursosState,
  (state) => state.cursos
);
