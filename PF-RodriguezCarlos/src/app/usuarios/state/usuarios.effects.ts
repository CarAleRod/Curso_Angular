import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatMap, map } from 'rxjs/operators';
import * as UsuariosActions from './usuarios.actions';
import { I_Usuario } from '../models/usuario';
import { UsuariosService } from '../service/usuarios.service';

@Injectable()
export class UsuariosEffects {
  cargarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.cargarUsuarios),
      concatMap(() =>
        this.usuariosService
          .obtenerUsuarios()
          .pipe(
            map((c: I_Usuario[]) =>
              UsuariosActions.usuariosCargados({ usuarios: c })
            )
          )
      )
    );
  });

  agregarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.agregarUsuario),
      concatMap(({ usuario }) =>
        this.usuariosService
          .agregarUsuario(usuario)
          .pipe(map((c: I_Usuario) => UsuariosActions.cargarUsuarios()))
      )
    );
  });

  editarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.editarUsuario),
      concatMap(({ usuario }) =>
        this.usuariosService
          .modificarUsuario(usuario.id, usuario)
          .pipe(map((c: I_Usuario) => UsuariosActions.cargarUsuarios()))
      )
    );
  });

  eliminarUsuarios$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(UsuariosActions.eliminarUsuario),
      concatMap(({ id }) =>
        this.usuariosService
          .borrarUsuario(id)
          .pipe(map((c: I_Usuario) => UsuariosActions.cargarUsuarios()))
      )
    );
  });

  constructor(
    private actions$: Actions,
    private usuariosService: UsuariosService
  ) {}
}
