import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { I_Sesion } from '../../models/sesion';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit, OnDestroy {
  sesion!: I_Sesion;
  subscripcion!: Subscription;

  constructor(private sesionService: SesionService) {}
  ngOnDestroy(): void {
    if (this.subscripcion) {
      this.subscripcion.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.subscripcion = this.sesionService.sesion$.subscribe(
      (sesion) => (this.sesion = sesion)
    );
  }
}
