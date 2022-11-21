import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { I_Sesion } from '../../models/sesion';
import { selectSesion } from '../../state/sesion.selectors';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sesion!: I_Sesion;
  subscripcion!: Subscription;

  constructor(private storeSesion: Store<I_Sesion>) {}
  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscripcion = this.storeSesion
      .select(selectSesion)
      .subscribe((sesion) => (this.sesion = sesion));
  }
}
