import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { AdminGuard } from './core/guards/admin.guard';
import { AutenticacionGuard } from './core/guards/autenticacion.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AutenticacionGuard] },
  {
    path: 'alumnos',
    loadChildren: () =>
      import('./alumnos/alumnos.module').then((m) => m.AlumnosModule),
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'autenticacion',
    loadChildren: () =>
      import('./autenticacion/autenticacion.module').then(
        (m) => m.AutenticacionModule
      ),
  },
  {
    path: 'cursos',
    loadChildren: () =>
      import('./cursos/cursos.module').then((m) => m.CursosModule),
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'inscripciones',
    loadChildren: () =>
      import('./inscripciones/inscripciones.module').then(
        (m) => m.InscripcionesModule
      ),
    canActivate: [AutenticacionGuard],
  },
  {
    path: 'usuarios',
    loadChildren: () =>
      import('./usuarios/usuarios.module').then((m) => m.UsuariosModule),
    canActivate: [AutenticacionGuard, AdminGuard],
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
