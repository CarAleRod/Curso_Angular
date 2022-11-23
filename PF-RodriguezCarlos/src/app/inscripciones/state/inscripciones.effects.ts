import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map, tap } from 'rxjs/operators';
import * as InscripcionesActions from './inscripciones.actions';
import { InscripcionesService } from '../services/inscripciones.service';
import { I_Inscripcion } from '../models/inscripcion';

@Injectable()
export class InscripcionesEffects {
  cargarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.cargarInscripciones),

      concatMap(() =>
        this.inscripcionesService
          .obtenerInscripciones()
          .pipe(
            map((c: I_Inscripcion[]) =>
              InscripcionesActions.inscripcionesCargadas({ inscripciones: c })
            )
          )
      )
    );
  });

  agregarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.agregarInscripcion),
      concatMap(({ inscripcion }) =>
        this.inscripcionesService
          .agregarInscripcion(inscripcion)
          .pipe(
            map((c: I_Inscripcion) =>
              InscripcionesActions.cargarInscripciones()
            )
          )
      )
    );
  });

  editarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.editarInscripcion),
      concatMap(({ inscripcion }) =>
        this.inscripcionesService
          .modificarInscripcion(inscripcion.id, inscripcion)
          .pipe(
            map((c: I_Inscripcion) =>
              InscripcionesActions.cargarInscripciones()
            )
          )
      )
    );
  });

  eliminarInscripciones$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.eliminarInscripcion),
      concatMap(({ id }) =>
        this.inscripcionesService
          .borrarInscripcion(id)
          .pipe(
            map((c: I_Inscripcion) =>
              InscripcionesActions.cargarInscripciones()
            )
          )
      )
    );
  });

  borrarInscripcionPorCurso$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscripcionesActions.borrarInscripcionPorCurso),
      map(({ id }) =>
        this.inscripcionesService.borrarInscripcionesPorCurso(id)
      ),
      map(() => InscripcionesActions.cargarInscripciones())
    );
  });

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService
  ) {}
}
