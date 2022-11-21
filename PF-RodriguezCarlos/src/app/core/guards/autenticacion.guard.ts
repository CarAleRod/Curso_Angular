import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { I_Sesion } from '../models/sesion';
import { selectSesion } from '../state/sesion.selectors';

@Injectable({
  providedIn: 'root',
})
export class AutenticacionGuard implements CanActivate {
  constructor(private storeSesion: Store<I_Sesion>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.storeSesion.select(selectSesion).pipe(
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
