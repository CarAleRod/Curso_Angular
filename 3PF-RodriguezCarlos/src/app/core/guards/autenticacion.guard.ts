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
export class AutenticacionGuard implements CanActivate {
  constructor(private sesion: SesionService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.sesion.sesion$.pipe(
      map((sesion: I_Sesion) => {
        if (sesion.sesionActiva) {
          return true;
        } else {
          this.router.navigate(['autenticacion/login']);
          return false;
        }
      })
    );
  }
}
