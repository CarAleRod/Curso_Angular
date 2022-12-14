import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { I_Sesion } from '../../models/sesion';
import { SesionService } from '../../services/sesion.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  sesion$!: Observable<I_Sesion>;
  constructor(private sesionService: SesionService, private router: Router) {}

  ngOnInit(): void {
    this.sesion$ = this.sesionService.sesion$;
  }
  logout() {
    this.sesionService.borrarSesion();
    this.router.navigate(['autenticacion/login']);
  }
}
