import { Action, createReducer, on } from '@ngrx/store';
import { I_CursoState } from '../models/curso.state';
import * as CursosActions from './cursos.actions';

export const cursosFeatureKey = 'cursos';

export const estadoInicial: I_CursoState = {
  cargando: false,
  cursos: [],
};

export const cursosReducer = createReducer(
  estadoInicial,

  on(CursosActions.cargarCursos, (state) => {
    return { ...state, cargando: true };
  }),
  on(CursosActions.cursosCargados, (state, { cursos }) => {
    return { ...state, cargando: false, cursos: cursos };
  }),
  on(CursosActions.agregarCurso, (state, { curso }) => {
    return state;
  }),
  on(CursosActions.editarCurso, (state, { curso }) => {
    return state;
  }),
  on(CursosActions.eliminarCurso, (state, { id }) => {
    return state;
  })
);
