import { I_Inscripcion } from './inscripcion';

export interface I_InscripcionConNombre extends I_Inscripcion {
  cursoNombre: string;
  alumnoNombre: string;
}
