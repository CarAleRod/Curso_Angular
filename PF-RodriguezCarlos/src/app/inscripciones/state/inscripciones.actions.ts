import { createAction, props } from '@ngrx/store';
import { I_Inscripcion } from '../models/inscripcion';

export const cargarInscripciones = createAction(
  '[Inscripciones] Cargar Inscripciones'
);

export const inscripcionesCargadas = createAction(
  '[Inscripciones] Inscripciones cargadas',
  props<{ inscripciones: I_Inscripcion[] }>()
);

export const agregarInscripcion = createAction(
  '[Inscripciones] Agregar inscripcion',
  props<{ inscripcion: I_Inscripcion }>()
);

export const editarInscripcion = createAction(
  '[Inscripciones] Editar inscripcion',
  props<{ inscripcion: I_Inscripcion }>()
);

export const eliminarInscripcion = createAction(
  '[Inscripciones] Eliminar inscripcion',
  props<{ id: number }>()
);
export const borrarInscripcionPorCurso = createAction(
  '[Inscripciones] Eliminar inscripciones por curso',
  props<{ id: number }>()
);
export const borrarInscripcionPorAlumno = createAction(
  '[Inscripciones] Eliminar inscripciones por alumno',
  props<{ id: number }>()
);
