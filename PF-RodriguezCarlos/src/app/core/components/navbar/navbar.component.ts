import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { I_Sesion } from '../../models/sesion';
import { borrarSession, cargarSesion } from '../../state/sesion.actions';
import { selectSesion } from '../../state/sesion.selectors';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sesion$!: Observable<I_Sesion>;
  constructor(private storeSesion: Store<I_Sesion>, private router: Router) {
    this.storeSesion.dispatch(cargarSesion());
  }

  ngOnInit(): void {
    this.sesion$ = this.storeSesion.select(selectSesion);
  }
  logout() {
    this.storeSesion.dispatch(borrarSession());
    this.router.navigate(['autenticacion/login']);
  }
}
