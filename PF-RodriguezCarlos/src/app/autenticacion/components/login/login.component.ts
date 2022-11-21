import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { I_Sesion } from 'src/app/core/models/sesion';
import { cargarUsuarioActivo } from 'src/app/core/state/sesion.actions';
import { I_Usuario } from 'src/app/usuarios/models/usuario';
import { UsuariosService } from 'src/app/usuarios/service/usuarios.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  sesion$!: Observable<I_Sesion>;
  hide = true;
  constructor(
    private storeSesion: Store<I_Sesion>,
    private usuariosService: UsuariosService,
    private router: Router,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formulario = new FormGroup({
      usuario: new FormControl('', [Validators.required]),
      clave: new FormControl('', []),
    });
  }

  login() {
    const usuarioForm = this.formulario.get('usuario')?.value;
    const claveForm = this.formulario.get('clave')?.value;
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuarios: I_Usuario[]) => {
        let usuarioValido = usuarios.filter(
          (usuarioBase) =>
            usuarioBase.usuario == usuarioForm && usuarioBase.clave == claveForm
        );
        if (usuarioValido.length > 0) {
          this.storeSesion.dispatch(
            cargarUsuarioActivo({ usuarioActivo: usuarioValido[0] })
          );
          this.router.navigate(['home']);
        } else {
          this.openSnackBar(
            'Usuario o clave inválida',
            'Login cancelado',
            3000
          );
        }
      },
    });
  }

  openSnackBar(message: string, action: string, duration: number) {
    if (duration && duration > 0) {
      this.matSnackBar.open(message, action, { duration: duration });
    } else {
      this.matSnackBar.open(message, action);
    }
  }
}
