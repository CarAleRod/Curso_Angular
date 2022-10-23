import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaAlumnosComponent } from './alumnos/components/lista-alumnos/lista-alumnos.component';
import { HomeComponent } from './core/components/home/home.component';
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { ListaCursosComponent } from './cursos/components/lista-cursos/lista-cursos.component';
import { ListaInscripcionesComponent } from './inscripciones/components/lista-inscripciones/lista-inscripciones.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'alumnos', component: ListaAlumnosComponent },
  { path: 'cursos', component: ListaCursosComponent },
  { path: 'inscripciones', component: ListaInscripcionesComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
