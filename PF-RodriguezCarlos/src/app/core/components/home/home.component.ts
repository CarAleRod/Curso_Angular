import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { I_Sesion } from '../../models/sesion';
import { cargarMenuActivo } from '../../state/sesion.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private storeSesion: Store<I_Sesion>) {}

  ngOnInit(): void {
    this.storeSesion.dispatch(cargarMenuActivo({ menuActivo: 'Home' }));
  }
}
