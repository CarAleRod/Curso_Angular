import { I_Curso } from './curso';

export interface I_CursoState {
  cargando: boolean;
  cursos: I_Curso[];
}
