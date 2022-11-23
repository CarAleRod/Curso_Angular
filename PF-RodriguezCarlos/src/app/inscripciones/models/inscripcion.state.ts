import { I_Inscripcion } from './inscripcion';

export interface I_InscripcionState {
  cargando: boolean;
  inscripciones: I_Inscripcion[];
}
