import { createAction, props } from '@ngrx/store';
import { I_Alumno } from '../models/alumno';

export const cargarAlumnos = createAction('[Alumnos] Cargar Alumnos');

export const alumnosCargados = createAction(
  '[Alumnos] Alumnos cargados',
  props<{ alumnos: I_Alumno[] }>()
);

export const agregarAlumno = createAction(
  '[Alumnos] Agregar alumno',
  props<{ alumno: I_Alumno }>()
);

export const editarAlumno = createAction(
  '[Alumnos] Editar alumno',
  props<{ alumno: I_Alumno }>()
);

export const eliminarAlumno = createAction(
  '[Alumnos] Eliminar alumno',
  props<{ id: number }>()
);
