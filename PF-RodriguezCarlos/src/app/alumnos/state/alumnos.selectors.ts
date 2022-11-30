import { createFeatureSelector, createSelector } from '@ngrx/store';
import { I_AlumnoState } from '../models/alumno.state';
import * as fromAlumnos from './alumnos.reducer';

export const selectAlumnosState = createFeatureSelector<I_AlumnoState>(
  fromAlumnos.alumnosFeatureKey
);

export const selectAlumnosCargando = createSelector(
  selectAlumnosState,
  (state) => state.cargando
);

export const selectAlumnos = createSelector(
  selectAlumnosState,
  (state) => state.alumnos
);
