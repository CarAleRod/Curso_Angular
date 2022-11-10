import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { I_Sesion } from '../models/sesion';
import { SesionService } from '../services/sesion.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private sesion: SesionService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.sesion.obtenerSesion().pipe(
      map((sesion: I_Sesion) => {
        if (sesion.usuarioActivo?.esAdmin) {
          return true;
        } else {
          alert('No tiene permisos para acceder a este sitio');
          this.router.navigate(['home']);
          return false;
        }
      })
    );
  }
}
