import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { I_Usuario } from 'src/app/usuarios/models/usuario';
import { I_Sesion } from '../models/sesion';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  sesionSubject!: BehaviorSubject<I_Sesion>;
  sesion$!: Observable<I_Sesion>;
  constructor() {
    const sesion: I_Sesion = {
      sesionActiva: false,
    };
    this.sesionSubject = new BehaviorSubject(sesion);
    this.sesion$ = this.sesionSubject.asObservable();
  }

  establecerSesion(usuario: I_Usuario) {
    const sesion: I_Sesion = {
      sesionActiva: true,
      usuarioActivo: usuario,
    };

    this.sesionSubject.next(sesion);
  }

  borrarSesion() {
    const sesion: I_Sesion = {
      sesionActiva: false,
    };

    this.sesionSubject.next(sesion);
  }
}
