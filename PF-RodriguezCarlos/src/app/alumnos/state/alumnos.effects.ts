import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as AlumnosActions from './alumnos.actions';
import { AlumnosService } from '../services/alumnos.service';
import { I_Alumno } from '../models/alumno';

@Injectable()
export class AlumnosEffects {
  cargarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.cargarAlumnos),
      concatMap(() =>
        this.alumnosService
          .obtenerAlumnos()
          .pipe(
            map((c: I_Alumno[]) =>
              AlumnosActions.alumnosCargados({ alumnos: c })
            )
          )
      )
    );
  });

  agregarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.agregarAlumno),
      concatMap(({ alumno }) =>
        this.alumnosService
          .agregarAlumno(alumno)
          .pipe(map((c: I_Alumno) => AlumnosActions.cargarAlumnos()))
      )
    );
  });

  editarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.editarAlumno),
      concatMap(({ alumno }) =>
        this.alumnosService
          .modificarAlumno(alumno.id, alumno)
          .pipe(map((c: I_Alumno) => AlumnosActions.cargarAlumnos()))
      )
    );
  });

  eliminarAlumnos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AlumnosActions.eliminarAlumno),
      concatMap(({ id }) =>
        this.alumnosService
          .borrarAlumno(id)
          .pipe(map((c: I_Alumno) => AlumnosActions.cargarAlumnos()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private alumnosService: AlumnosService
  ) {}
}
