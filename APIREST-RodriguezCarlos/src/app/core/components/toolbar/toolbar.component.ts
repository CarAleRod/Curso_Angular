import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { I_Sesion } from '../../models/sesion';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  sesion$!: Observable<I_Sesion>;

  constructor(private sesionService: SesionService) {}

  ngOnInit(): void {
    this.sesion$ = this.sesionService.sesion$;
  }
}
