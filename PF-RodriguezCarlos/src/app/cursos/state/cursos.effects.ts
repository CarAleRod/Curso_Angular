import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { concatMap, map } from 'rxjs/operators';
import * as CursosActions from './cursos.actions';
import { CursosService } from '../services/cursos.service';
import { I_Curso } from '../models/curso';

@Injectable()
export class CursosEffects {
  cargarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.cargarCursos),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(() =>
        this.cursosService
          .obtenerCursos()
          .pipe(
            map((c: I_Curso[]) => CursosActions.cursosCargados({ cursos: c }))
          )
      )
    );
  });

  agregarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.agregarCurso),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(({ curso }) =>
        this.cursosService
          .agregarCurso(curso)
          .pipe(map((c: I_Curso) => CursosActions.cargarCursos()))
      )
    );
  });

  editarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.editarCurso),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(({ curso }) =>
        this.cursosService
          .modificarCurso(curso.id, curso)
          .pipe(map((c: I_Curso) => CursosActions.cargarCursos()))
      )
    );
  });

  eliminarCursos$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CursosActions.eliminarCurso),
      /** An EMPTY observable only emits completion. Replace with your own observable API request */
      concatMap(({ id }) =>
        this.cursosService
          .borrarCurso(id)
          .pipe(map((c: I_Curso) => CursosActions.cargarCursos()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private cursosService: CursosService
  ) {}
}
