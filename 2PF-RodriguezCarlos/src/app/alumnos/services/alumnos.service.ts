import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BaseDeDatos } from 'src/data/Datos';
import { I_Alumno } from '../models/alumno';

@Injectable({
  providedIn: 'root',
})
export class AlumnosService {
  alumnos: I_Alumno[] = BaseDeDatos.Alumnos;
  alumnosSubject: BehaviorSubject<I_Alumno[]>;
  alumnosObservables!: Observable<I_Alumno[]>;
  constructor() {
    this.alumnosSubject = new BehaviorSubject<I_Alumno[]>(this.alumnos);
    this.alumnosObservables = this.alumnosSubject.asObservable();
  }
  agregarAlumno(alumno: I_Alumno) {
    this.alumnos.push(alumno);
    this.alumnosSubject.next(this.alumnos);
  }

  borrarAlumno(id: number) {
    let position = this.alumnos.findIndex((alumno) => alumno.id == id);
    this.alumnos.splice(position, 1);
    this.alumnosSubject.next(this.alumnos);
  }

  modificarAlumno(id: number, alumno: I_Alumno) {
    let position = this.alumnos.findIndex((alumno) => alumno.id == id);
    let newData = {
      ...alumno,
      id: id,
    };
    this.alumnos[position] = newData;
    this.alumnosSubject.next(this.alumnos);
  }
}
