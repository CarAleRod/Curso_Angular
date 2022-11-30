import { Action, createReducer, on } from '@ngrx/store';
import { I_InscripcionState } from '../models/inscripcion.state';
import * as InscripcionesActions from './inscripciones.actions';

export const inscripcionesFeatureKey = 'inscripciones';

export const estadoInicial: I_InscripcionState = {
  cargando: false,
  inscripciones: [],
};

export const inscripcionesReducer = createReducer(
  estadoInicial,

  on(InscripcionesActions.cargarInscripciones, (state) => {
    return { ...state, cargando: true };
  }),

  on(InscripcionesActions.inscripcionesCargadas, (state, { inscripciones }) => {
    return { ...state, cargando: false, inscripciones: inscripciones };
  }),
  on(InscripcionesActions.agregarInscripcion, (state, { inscripcion }) => {
    return state;
  }),
  on(InscripcionesActions.editarInscripcion, (state, { inscripcion }) => {
    return state;
  }),
  on(InscripcionesActions.eliminarInscripcion, (state, { id }) => {
    return state;
  }),
  on(InscripcionesActions.borrarInscripcionPorCurso, (state, { id }) => {
    return state;
  }),
  on(InscripcionesActions.borrarInscripcionPorAlumno, (state, { id }) => {
    return state;
  })
);
