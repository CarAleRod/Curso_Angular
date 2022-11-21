import { createAction, props } from '@ngrx/store';
import { I_Curso } from '../models/curso';

export const cargarCursos = createAction('[Cursos] Cargar Cursos');

export const cursosCargados = createAction(
  '[Cursos] Cursos cargados',
  props<{ cursos: I_Curso[] }>()
);

export const agregarCurso = createAction(
  '[Cursos] Agregar curso',
  props<{ curso: I_Curso }>()
);

export const editarCurso = createAction(
  '[Cursos] Editar curso',
  props<{ curso: I_Curso }>()
);

export const eliminarCurso = createAction(
  '[Cursos] Eliminar curso',
  props<{ id: number }>()
);
