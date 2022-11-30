import { I_Alumno } from './alumno';

export interface I_AlumnoState {
  cargando: boolean;
  alumnos: I_Alumno[];
}
