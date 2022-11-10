import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { I_Usuario } from 'src/app/usuarios/models/usuario';
import { I_Sesion } from '../models/sesion';

@Injectable({
  providedIn: 'root',
})
export class SesionService {
  sesion!: I_Sesion;
  sesionSubject!: BehaviorSubject<I_Sesion>;
  sesion$!: Observable<I_Sesion>;
  constructor() {
    this.sesion = {
      sesionActiva: false,
    };
    this.sesionSubject = new BehaviorSubject(this.sesion);
    this.sesion$ = this.sesionSubject.asObservable();
  }

  establecerSesion(usuario: I_Usuario, menu: string) {
    this.sesion = {
      sesionActiva: true,
      usuarioActivo: usuario,
      menuActivo: menu,
    };

    this.sesionSubject.next(this.sesion);
  }
  establecerMenuActivo(menu: string) {
    this.sesion.menuActivo = menu;
    this.sesionSubject.next(this.sesion);
  }
  borrarSesion() {
    this.sesion = {
      sesionActiva: false,
    };

    this.sesionSubject.next(this.sesion);
  }

  obtenerSesion(): Observable<I_Sesion> {
    return this.sesionSubject.asObservable();
  }
}
