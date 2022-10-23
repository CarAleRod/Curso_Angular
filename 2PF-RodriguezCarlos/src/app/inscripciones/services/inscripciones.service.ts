import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseDeDatos } from 'src/data/Datos';
import { I_Inscripcion } from '../models/inscripcion';

@Injectable({
  providedIn: 'root',
})
export class InscripcionesService {
  borrarInscripcionesPorCurso(id: number) {
    let len = this.inscripciones.length - 1;
    for (let i = len; i > -1; i--) {
      if (this.inscripciones[i].cursoId == id) {
        this.inscripciones.splice(i, 1);
      }
    }
    this.inscripcionesSubject.next(this.inscripciones);
  }
  borrarInscripcionesPorAlumno(id: number) {
    let len = this.inscripciones.length - 1;
    for (let i = len; i > -1; i--) {
      if (this.inscripciones[i].alumnoId == id) {
        this.inscripciones.splice(i, 1);
      }
    }
    this.inscripcionesSubject.next(this.inscripciones);
  }
  inscripciones: I_Inscripcion[] = BaseDeDatos.Inscripciones;
  inscripcionesSubject: BehaviorSubject<I_Inscripcion[]>;
  inscripcionesObservables!: Observable<I_Inscripcion[]>;
  constructor() {
    this.inscripcionesSubject = new BehaviorSubject<I_Inscripcion[]>(
      this.inscripciones
    );
    this.inscripcionesObservables = this.inscripcionesSubject.asObservable();
  }
  agregarInscripcion(Inscripcion: I_Inscripcion) {
    this.inscripciones.push(Inscripcion);
    this.inscripcionesSubject.next(this.inscripciones);
  }

  borrarInscripcion(id: number) {
    let position = this.inscripciones.findIndex(
      (Inscripcion) => Inscripcion.id == id
    );
    this.inscripciones.splice(position, 1);
    this.inscripcionesSubject.next(this.inscripciones);
  }

  modificarInscripcion(id: number, Inscripcion: I_Inscripcion) {
    let position = this.inscripciones.findIndex(
      (Inscripcion) => Inscripcion.id == id
    );
    let newData = {
      ...Inscripcion,
      id: id,
    };
    this.inscripciones[position] = newData;
    this.inscripcionesSubject.next(this.inscripciones);
  }

  existeInscripcion(inscripcion: I_Inscripcion) {
    const inscripcionExistente = this.inscripciones.find(
      (insc) =>
        insc.cursoId == inscripcion.cursoId &&
        insc.alumnoId == inscripcion.alumnoId
    );
    return inscripcionExistente != null;
  }
}
